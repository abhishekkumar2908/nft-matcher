package com.hashdb.util;

import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

import javax.imageio.ImageIO;

import org.apache.batik.transcoder.TranscoderException;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.PNGTranscoder;

public class convertToPng {
    public static BufferedImage readThis1(URL imageUrl) throws IOException, TranscoderException {
    	
        PNGTranscoder transcoder = new PNGTranscoder();

        transcoder.addTranscodingHint(PNGTranscoder.KEY_BACKGROUND_COLOR, new Color(0, 0, 0, 0));

        InputStream input = imageUrl.openStream();

        TranscoderInput svgInput = new TranscoderInput(input);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        TranscoderOutput pngOutput = new TranscoderOutput(outputStream);

        transcoder.transcode(svgInput, pngOutput);

        outputStream.flush();
        outputStream.close();

        ByteArrayInputStream pngInput = new ByteArrayInputStream(outputStream.toByteArray());

        BufferedImage image = ImageIO.read(pngInput);

        pngInput.close();

        return image;
    }

    public static void saveImage(BufferedImage image, String localFilePath) throws IOException {
        File outputFile = new File(localFilePath);
        ImageIO.write(image, "png", outputFile);
    }

	public static BufferedImage convertSvgToPng(InputStream inputStream) throws TranscoderException, IOException {
		PNGTranscoder transcoder = new PNGTranscoder();

        transcoder.addTranscodingHint(PNGTranscoder.KEY_BACKGROUND_COLOR, new Color(0, 0, 0, 0));
        
        TranscoderInput svgInput = new TranscoderInput(inputStream);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        TranscoderOutput pngOutput = new TranscoderOutput(outputStream);

        transcoder.transcode(svgInput, pngOutput);

        outputStream.flush();
        outputStream.close();

        ByteArrayInputStream pngInput = new ByteArrayInputStream(outputStream.toByteArray());

        BufferedImage image = ImageIO.read(pngInput);

        pngInput.close();

        return image;
	}
}
