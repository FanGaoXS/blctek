package com.blctek.messageserver.controller;

import com.blctek.commonserver.response.ResultResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created with IntelliJ IDEA.
 *
 * @Auther: 吴青珂
 * @Date: 2021/08/24/16:31
 * @Description:
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/")
public class IndexController {

    @RequestMapping("/")
    public ResultResponse index(){
        return new ResultResponse()
                .setData(true)
                .setMessage("这是message-server服务器");
    }

}
