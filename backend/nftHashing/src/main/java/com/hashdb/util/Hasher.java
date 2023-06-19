package com.hashdb.util;

import java.awt.image.BufferedImage;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.springframework.web.multipart.MultipartFile;

import dev.brachtendorf.jimagehash.hash.Hash;


public class Hasher{
	public static Hash Hashing(MultipartFile file) throws IOException
    {
        
        	BufferedImage hashImage = ImageIO.read(file.getInputStream());
        	return HashingUtility.hashImage(hashImage);
       
    }
        
        
}