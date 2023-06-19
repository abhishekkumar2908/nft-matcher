package com.hashdb.util;
import java.awt.image.BufferedImage;

import dev.brachtendorf.jimagehash.hash.Hash;
import dev.brachtendorf.jimagehash.hashAlgorithms.HashingAlgorithm;
import dev.brachtendorf.jimagehash.hashAlgorithms.PerceptiveHash;

public class HashingUtility {
    public static Hash hashImage(BufferedImage hashImg){       
        
    HashingAlgorithm hasher = new PerceptiveHash(32);
    return hasher.hash(hashImg);
    		
    }    
}
