package com.infosiatec.common;

import java.io.File;
import java.io.FileWriter;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.UUID;

import org.springframework.util.FileCopyUtils;

import net.coobird.thumbnailator.Thumbnails;

public class CommonFileCreate {
	
	static final int THUMB_WIDTH = 450;
	static final int THUMB_HEIGHT = 300;
	
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
	
	//file upload logic
	public static String fileSave(String filePath, String fileName, byte[] jsonData, String xmlPath) throws Exception{
		
		System.out.println("filePath : "+filePath);
		System.out.println("fileName : "+fileName);
		System.out.println("fileData : "+jsonData);
		System.out.println("xmlPath : " + xmlPath);
		UUID uid = UUID.randomUUID();
		
		String newFileName = uid + "-" + fileName;
		String imgPath = filePath + xmlPath;
		
		File target = new File(imgPath, newFileName);
		FileCopyUtils.copy(jsonData, target);
		
		String thumbFileName = "s_" + newFileName;
		File image = new File(imgPath + File.separator + newFileName);
		
		File thumbnail = new File(imgPath + File.separator + "s" + File.separator + thumbFileName);
		
		if (image.exists()) {
			thumbnail.getParentFile().mkdirs();
			Thumbnails.of(image).size(THUMB_WIDTH, THUMB_HEIGHT).toFile(thumbnail);
		}
		return newFileName;	
	}
	
	//Create folder name, folder
	public static String calcPath(String filePath) {
		Calendar cal = Calendar.getInstance();
		String yearPath = File.separator + cal.get(Calendar.YEAR);
		
		String monthPath = yearPath + File.separator + new DecimalFormat("00").format(cal.get(Calendar.MONTH) + 1);
		String datePath = monthPath + File.separator + new DecimalFormat("00").format(cal.get(Calendar.DATE));
		
		makeDir(filePath, yearPath, monthPath, datePath);
		makeDir(filePath, yearPath, monthPath, datePath + "\\s");
		
		return datePath;
	}
	
	// create directory
	public static void makeDir(String filePath, String... paths) {
		if (new File(paths[paths.length - 1]).exists()) {
			return;
		}

		for (String path : paths) {
			File dirPath = new File(filePath + path);

			if (!dirPath.exists()) {
				dirPath.mkdir();
			}
		}
	}
}
