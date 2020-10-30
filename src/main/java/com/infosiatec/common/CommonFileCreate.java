package com.infosiatec.common;

import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;

import javax.imageio.ImageIO;

import org.apache.tomcat.util.codec.binary.Base64;

public class CommonFileCreate {
	
	private static final String BASE_64_PREFIX = "data:image/png;base64,";
	
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
	
	public static void resize(String pngPath, String fileName) throws Exception {
		// Original image
		System.out.println(pngPath);
		// thumb img
		String imgFormat = "png";
		String thumbPath =
				pngPath.replaceAll("pngData\\\\".concat(fileName).concat(".png"),"")
				.concat("thumb").concat(File.separator).concat(fileName)+"_thumb."+imgFormat;
		
		int newWidth = 450;
		int newHeight = 300;
		
		Image image;
		int imgWidth;
		int imgHeight;
		try {
			//원본 이미지 가져오기
			image = ImageIO.read(new File(pngPath));
			imgWidth = image.getWidth(null);
			imgHeight = image.getHeight(null);
			System.out.println("imageWidth : " + imgWidth);
			System.out.println("imageHeight : " + imgHeight);

			Image resizeImage = image.getScaledInstance(newWidth, newHeight, Image.SCALE_SMOOTH);
			System.out.println("reimageWidth : " + resizeImage.getWidth(null));
			System.out.println("reimageHeight : " + resizeImage.getHeight(null));
			
			BufferedImage thumb = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_ARGB);
			Graphics g = thumb.getGraphics();
			g.drawImage(resizeImage, 0, 0, null);
			//g.drawImage(resizeImage, 0, 0, "#FFFFFF", observer)
			g.dispose();

			ImageIO.write(thumb, imgFormat, new File(thumbPath));			
		}catch(Exception e) {
			e.printStackTrace();
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