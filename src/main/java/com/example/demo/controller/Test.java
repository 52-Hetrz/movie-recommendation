package com.example.demo.controller;

/**
 * @ClassName Test
 * @Description
 * @Author Life
 * @Date 2021/7/7 14:15
 * @Version 1.0
 */


public class Test {

    public static void main(String[] args) {

        String value = "A";
        String newValue = value.replace("","%");
        String after = newValue.substring(1,newValue.length()-1);
        System.out.println(after);
    }
}
