package com.infosiatec.common;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;

public class CommonFileCreate {
	@Autowired
	static ServletContext c;
	
	private static final String BASE_64_PREFIX = "data:image/png;base64,";
	private static final int THUMB_WIDTH = 450;
	private static final int THUMB_HEIGHT = 300;	
	private static final String JSON_EXTENSION = ".json";
	private static final String PNG_EXTENSION = ".png";
	
	public static boolean jsonCreate(String jsonData,String jsonPath) {
		try {
			FileWriter file = new FileWriter(jsonPath);
			file.write(jsonData);
			file.flush();
			file.close();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public static boolean pngCreate(String imgData, String pngPath) {
		String data = imgData.replaceAll(BASE_64_PREFIX,"");
		byte[] png = Base64.decodeBase64(data.getBytes());
		try {
			FileOutputStream fos = new FileOutputStream(new File(pngPath));
			fos.write(png);
			fos.flush();
			fos.close();
		}catch(Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public static void resize(String pngPath) throws Exception{
		File in = new File(pngPath);
		BufferedImage inputImage = ImageIO.read(in);
		
		String[] ext = {"bmp","gif","jpg","jpeg","png"};
		
		for (String format : ext) {
			BufferedImage outputImage = new BufferedImage(THUMB_WIDTH,THUMB_HEIGHT,BufferedImage.);
		}
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

	 
	public static String existJson(String fileName,String jsonPath) {
		File folder= new File(jsonPath);
		if(!folder.exists()) {
			folder.mkdir();
			jsonPath += fileName + JSON_EXTENSION;
		}else {
			jsonPath += fileName + JSON_EXTENSION;
		}
		return jsonPath;
	}
	
	public static String existPng(String fileName, String pngPath){
		File folder= new File(pngPath);
		if(!folder.exists()) {
			folder.mkdir();
			pngPath += fileName + PNG_EXTENSION;
		}else {
			pngPath += fileName + PNG_EXTENSION;
		}
		return pngPath;
	}

	
}
