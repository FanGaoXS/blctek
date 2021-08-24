package com.blctek.messageserver.vo.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 *
 * @Auther: 吴青珂
 * @Date: 2021/08/24/16:49
 * @Description:
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoMessageResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    private int id;

    private String content;

    private Date sendTime;

    private String sender;

    private String receiver;

}
