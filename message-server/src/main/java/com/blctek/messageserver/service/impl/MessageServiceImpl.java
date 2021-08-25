package com.blctek.messageserver.service.impl;

import com.blctek.commonserver.vo.VoList;
import com.blctek.messageserver.mapper.MessageMapper;
import com.blctek.messageserver.pojo.Message;
import com.blctek.messageserver.service.MessageService;
import com.blctek.messageserver.vo.request.VoMessageRequest;
import com.blctek.messageserver.vo.response.VoMessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 *
 * @Auther: 吴青珂
 * @Date: 2021/08/24/16:47
 * @Description:
 */
@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageMapper messageMapper;

    @Override
    public boolean insertMessage(VoMessageRequest voMessageRequest) {
        Message message = new Message();
        message.setContent(voMessageRequest.getContent());
        message.setSendTime(new Date());
        message.setSender(voMessageRequest.getSender());
        message.setReceiver(voMessageRequest.getReceiver());
        return messageMapper.insertOne(message) > 0;
    }

    @Override
    public boolean deleteMessage(int id) {
        Message message = new Message();
        message.setId(id);
        return messageMapper.deleteOne(message) > 0;
    }

    @Override
    public VoList<VoMessageResponse> selectMessageListByPlateNumber(String plateNumber, int currentPage, int pageSize) {
        List<Message> messageList = messageMapper.selectListByPlateNumber(plateNumber, currentPage, pageSize);

        VoList<VoMessageResponse> voList = new VoList<>();
        voList.setTotalSize(messageMapper.countByPlateNumber(plateNumber));
        voList.setCurrentPage(currentPage);
        voList.setPageSize(pageSize);
        LinkedList<VoMessageResponse> items = new LinkedList<>();
        messageList.forEach(message -> {
            items.add(new VoMessageResponse(message));
        });
        voList.setItems(items);
        return voList;
    }


}
