package com.QuestionBank.Bank.Controller;

import java.io.FileReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.QuestionBank.Bank.Repository.Questions;
import com.QuestionBank.Bank.Service.QuestionService;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;

@RequestMapping("/questions") @RestController
@CrossOrigin(origins = "http://localhost:5174")
public class QuestionController {

	@Autowired
	QuestionService service;
	
	@GetMapping
	public List<Questions> getAll(){
		return service.getAll();
	}
	
	@GetMapping("/{experience}")
	public List<Questions> getAllByExperience(@PathVariable int exp){
		return service.getByExp(exp);
	}
	@GetMapping("/{role}")
	public List<Questions> getAllByRole(@PathVariable String role){
		return service.getByRole(role);
	}
	@GetMapping("/{technology}")
	public List<Questions> getAllByTechnology(@PathVariable String tech){
		return service.getByTechnolgy(tech);
	}
	
	@PostMapping
	public Questions setQuestion(@RequestBody Questions que) {
		return service.add(que);
	}
	@PostMapping("/bulk")
	public List<Questions> setQuestionList(@RequestBody List<Questions> que){
		return service.add(que);
	}
	
	
	@GetMapping("/upload")
    public List<Questions> getQuestions() throws Exception {
        Reader reader = new FileReader("questions.csv");
        CsvToBean<Questions> csvToBean = new CsvToBeanBuilder<Questions>(reader)
                .withType(Questions.class)
                .withIgnoreLeadingWhiteSpace(true)
                .build();

        List<Questions> questions = csvToBean.parse();
        reader.close();
        return questions;
    }
	
	@PostMapping("/questions")
	public List<Questions> uploadQuestions(@RequestParam("file") MultipartFile file) throws Exception {
	    Reader reader = new InputStreamReader(file.getInputStream());

	    CsvToBean<Questions> csvToBean = new CsvToBeanBuilder<Questions>(reader)
	            .withType(Questions.class)
	            .withIgnoreLeadingWhiteSpace(true)
	            .build();

	    List<Questions> questions = csvToBean.parse();
	    service.add(questions);
	    reader.close();
	    return questions;
	}

	
}
