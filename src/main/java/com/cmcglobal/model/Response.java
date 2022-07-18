package com.cmcglobal.model;

public class Response {

    private String code;
    private String message;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Response(String code, String message) {
        super();
        this.code = code;
        this.message = message;
    }

    public Response() {
        super();
    }

}
