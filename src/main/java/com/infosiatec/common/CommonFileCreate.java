package com.infosiatec.common;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class CommonFileCreate {

	public static boolean fileCreate(String filePath, String jsonData) {
		try {
			FileWriter file = new FileWriter(filePath);
			file.write(jsonData);
			file.flush();
			file.close();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public static boolean fileOverwrite(String filePath, String jsonData) {
		try {
			FileWriter file = new FileWriter(filePath, false);
			file.write(jsonData);
			file.flush();
			file.close();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
}
