package com.blctek.loggerserver.controller;

import com.blctek.commonserver.response.ResultResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created with IntelliJ IDEA.
 *
 * @Auther: 吴青珂
 * @Date: 2021/03/22/13:38
 * @Description:
 */
@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class IndexController {
    @RequestMapping("/")
    public ResultResponse index(){
        return new ResultResponse()
                .setData(true)
                .setMessage("这是logger-server服务器");
    }
}
