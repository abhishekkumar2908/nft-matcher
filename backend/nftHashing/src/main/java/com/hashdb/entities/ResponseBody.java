package com.hashdb.entities;

import java.text.SimpleDateFormat;
import java.util.Date;


/**
 * @author Ravi Pandit
 *
 * @param <T>
 */
public class ResponseBody <T> {
    private int res_code;
    private String res_message;
    private String serverTime;
    private T res_object;

    public ResponseBody() {
    	serverTime = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ").format(new Date());
    }

    public ResponseBody(int res_code, String res_message, T res_object) {
        this.res_code = res_code;
        this.res_message = res_message;
        this.res_object = res_object;
    	serverTime = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ").format(new Date());
    }


	public String getServerTime() {
		return serverTime;
	}

	public void setServerTime(String serverTime) {
		this.serverTime = serverTime;
	}

	public int getRes_code() {
        return res_code;
    }

    public void setRes_code(int res_code) {
        this.res_code = res_code;
    }

    public String getRes_message() {
        return res_message;
    }

    public void setRes_message(String res_message) {
        this.res_message = res_message;
    }

    public T getRes_object() {
        return res_object;
    }

    public void setRes_object(T res_object) {
        this.res_object = res_object;
    }
}
