package com.QuestionBank.Bank.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Questions, Integer>{
	 List<Questions> findByExperience(int experience);
	 List<Questions> findByRole(String role);
	 List<Questions> findByTechnology(String technology);
}
