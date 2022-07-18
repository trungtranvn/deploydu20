package com.cmcglobal.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cmcglobal.model.User;
import com.cmcglobal.repo.RoleRepository;
import com.cmcglobal.repo.UserRepository;
import com.cmcglobal.security.jwt.JwtUtils;
import com.cmcglobal.service.JwtResponse;
import com.cmcglobal.service.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    private Authentication authentication;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody User loginRequest) {
        JwtResponse jwtRes = new JwtResponse();

        Optional<User> user = userRepository.findByUsername(loginRequest.getUsername());

        // trường hợp có giá trị của user thì tiếp tục, không thì bắn lỗi 404
        if (user.isPresent() && !"".equals(user.get().getUsername())) {
            // giá trị login sai lớn nhỏ hơn 5 thì thực hiện hàm xác thực, sinh token
            if (user.get().getNumber_login_fail() < 5) {
                jwtRes = genToken(loginRequest.getUsername(), loginRequest.getPassword(), user);
            } else {
                Date a = user.get().getLast_login_fail();
                Date b = new Date(System.currentTimeMillis());
                long f = b.getTime() - a.getTime();
                long min = f / 1000 / 60;
                if (min <= 5) {// thời gian đăng nhập sai nhỏ hơn 5p thì k cho đăng nhập
                    jwtRes = new JwtResponse("500", "Please log in after 5 minues", null, null,
                            user.get().getUsername(), null, null);
                } else {// set lại giá trị numberLoginFail và lastLoginFail để hàm sinh token kiểm tra
                        // và có thực hiện đếm đúng số lần đăng nhập còn lại theo công thức (5-n)
                    /*
                     * Date date = null; int number = 0;
                     * userRepository.updateLoginFailTime(user.get().getUsername(), date, number);
                     * user.get().setNumber_login_fail(0); user.get().setLast_login_fail(null);
                     */
                    jwtRes = genToken(loginRequest.getUsername(), loginRequest.getPassword(), user);
                }
            }
        } else {
            jwtRes.setCode("404");
            jwtRes.setMessage("Wrong username /password");
        }
        return ResponseEntity.ok(jwtRes);

    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    private JwtResponse genToken(String userName, String passWord, Optional<User> user) {
        JwtResponse jwtRes = new JwtResponse();
        Date date = null;
        int number = 0;
        try {
            authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(userName, passWord));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                    .collect(Collectors.toList());
            jwtRes = new JwtResponse("200", "Thành Công", jwt, userDetails.getId(), userDetails.getUsername(),
                    userDetails.getEmail(), roles);

        } catch (Exception e) {// nếu mật khẩu và tài khoản không đúng xảy ra exception, xử lý câu cảnh báo
                               // theo công thức và trả về mã 500
            date = new Date(System.currentTimeMillis());
            number = user.get().getNumber_login_fail() + 1;
            String mess = " You have " + (5 - number) + " times to input data";
            jwtRes = new JwtResponse("500", mess, null, null, user.get().getUsername(), null, null);
        }
        // update lại thông tin sau mỗi lần đăng nhập
        userRepository.updateLoginFailTime(user.get().getUsername(), date, number);
        return jwtRes;
    }

    @PostMapping(value = "/signup", consumes = { MediaType.APPLICATION_JSON_VALUE,
            MediaType.APPLICATION_XML_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE,
                    MediaType.APPLICATION_XML_VALUE })
    public ResponseEntity<?> registerUser(@Valid @RequestBody User signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        // Set<Role> strRoles = signUpRequest.getRoles();

        // user.setRoles(strRoles);
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    @GetMapping
    public String index() {
        return "register";
    }
}
