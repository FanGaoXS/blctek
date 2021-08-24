package com.blctek.messageserver.service.impl;

import com.blctek.commonserver.vo.VoList;
import com.blctek.messageserver.pojo.Message;
import com.blctek.messageserver.service.MessageService;
import com.blctek.messageserver.vo.request.VoMessageRequest;
import com.blctek.messageserver.vo.response.VoMessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    private MessageService messageService;

    @Override
    public boolean insertMessage(VoMessageRequest voMessageRequest) {
        return false;
    }

    @Override
    public boolean deleteMessage(int id) {
        return false;
    }

    @Override
    public VoList<VoMessageResponse> selectMessageListBySenderAndBroadcast(String sender) {
        return null;
    }

    @Override
    public VoList<VoMessageResponse> selectMessageListBySenderAndReceiver(String sender, String receiver) {
        return null;
    }
}
