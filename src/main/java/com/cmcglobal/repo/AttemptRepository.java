package com.cmcglobal.repo;

import com.cmcglobal.model.Attempt;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttemptRepository extends JpaRepository<Attempt, String> {
    Optional<Attempt> findAttemptsByUsername(String username);
}
