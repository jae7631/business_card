package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.infosiatec.controller")
public class BusinessCardApplication {

	public static void main(String[] args) {
		SpringApplication.run(BusinessCardApplication.class, args);
	}

}
