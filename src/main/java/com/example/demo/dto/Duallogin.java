package com.example.demo.dto;

import lombok.Builder;
import lombok.Data;

 
 
public class Duallogin {
    public String name;
     public String info;
    public Duallogin() {
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getInfo() {
        return info;
    }
    public void setInfo(String info) {
        this.info = info;
    }
}
