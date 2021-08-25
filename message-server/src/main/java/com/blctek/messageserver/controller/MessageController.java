package com.blctek.messageserver.controller;

import com.blctek.commonserver.response.ResultResponse;
import com.blctek.commonserver.vo.VoList;
import com.blctek.messageserver.service.MessageService;
import com.blctek.messageserver.vo.request.VoMessageRequest;
import com.blctek.messageserver.vo.response.VoMessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created with IntelliJ IDEA.
 *
 * @Auther: 吴青珂
 * @Date: 2021/08/25/15:00
 * @Description:
 */
@RestController
@RequestMapping("/message")
@CrossOrigin("*")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/insertOne")
    public ResultResponse insertOne(@RequestBody VoMessageRequest voMessageRequest){
        boolean result = messageService.insertMessage(voMessageRequest);
        return new ResultResponse()
                .setMessage("新增一条聊天记录")
                .setData(result);
    }

    @GetMapping("/selectListByPlateNumber")
    public ResultResponse selectListByPlateNumber(@RequestParam(required = true) String plateNumber,
                                                  @RequestParam(required = true) int currentPage,
                                                  @RequestParam(required = true) int pageSize){
        System.out.println("plateNumber = " + plateNumber + ", currentPage = " + currentPage + ", pageSize = " + pageSize);
        VoList<VoMessageResponse> voList = messageService.selectMessageListByPlateNumber(plateNumber, currentPage, pageSize);
        return new ResultResponse()
                .setMessage("根据车牌号查询与之相关的聊天记录（分页）")
                .setData(voList);
    }


}
