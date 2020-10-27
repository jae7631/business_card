package com.infosiatec.common;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class CommonFileRead {

	public static String fileRead(String filePath) throws IOException {
		List<String> lines = Files.readAllLines(Paths.get(filePath), StandardCharsets.UTF_8);
		
		StringBuffer sb = new StringBuffer();
		for(String line : lines) {
			sb.append(line);
		}
		return sb.toString();
	}
}
