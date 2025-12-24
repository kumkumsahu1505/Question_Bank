package com.QuestionBank.Bank.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.QuestionBank.Bank.Repository.QuestionRepository;
import com.QuestionBank.Bank.Repository.Questions;

@Service
public class QuestionService {
	
	@Autowired
	QuestionRepository repo;
	
	public Questions add(Questions que) {
		return repo.save(que);
	}
	
	public List<Questions> add(List<Questions> que){
		return repo.saveAll(que);
	}
	   
	public List<Questions> getByExp(int exp) {
		return repo.findByExperience(exp);
	}
	
	public List<Questions> getByRole(String Role) {
		return repo.findByRole(Role);
	}
	public List<Questions> getByTechnolgy(String Technology) {
		return repo.findByTechnology(Technology);
	}
	public List<Questions> getAll(){
		return repo.findAll();
	}
}
