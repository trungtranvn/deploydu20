package com.cmcglobal.controller;

import com.cmcglobal.service.SearchUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/users")
public class SearchUserController {
    @Autowired
    private SearchUserService searchUserService;

    @PostMapping()
    public ResponseEntity<?> findUsersPaginated(@RequestBody(required = false) Map<String, String> request) {
        String keyword = request.get("keyword");
        String filters = request.get("filters");
        int pageNo = Integer.parseInt(request.get("pageNo"));
        int pageSize = Integer.parseInt(request.get("pageSize"));

        Pageable pageable = PageRequest.of(pageNo, pageSize);

        if (filters == null || filters.isEmpty()) {
            return ResponseEntity.ok(searchUserService.getAllUsers(pageable));
        } else {
            return ResponseEntity.ok(searchUserService.findUsersPaginated(keyword, pageable, filters.split(",")));
        }

    }
}
