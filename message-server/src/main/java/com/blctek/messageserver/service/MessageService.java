package com.blctek.messageserver.service;

import com.blctek.commonserver.vo.VoList;
import com.blctek.messageserver.vo.request.VoMessageRequest;
import com.blctek.messageserver.vo.response.VoMessageResponse;
import org.springframework.stereotype.Service;

/**
 * Created with IntelliJ IDEA.
 *
 * @Auther: 吴青珂
 * @Date: 2021/08/24/16:30
 * @Description:
 */
@Service
public interface MessageService {

    boolean insertMessage(VoMessageRequest voMessageRequest);

    boolean deleteMessage(int id);

    VoList<VoMessageResponse> selectMessageListByPlateNumber(String plateNumber,
                                                             int currentPage,
                                                             int pageSize);
}
