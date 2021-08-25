package com.blctek.messageserver.pojo;

import java.util.Date;

import com.blctek.commonserver.pojo.BasePojo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @TableName message
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message extends BasePojo {

    private static final long serialVersionUID = 1L;
    /**
     * 自增主键
     */
    private Integer id;

    /**
     * 消息内容
     */
    private String content;

    /**
     * 发送时间
     */
    private Date sendTime;

    /**
     * 接收时间
     */
    private Date receiveTime;

    /**
     * 发送方
     */
    private String sender;

    /**
     * 接收方
     */
    private String receiver;

    /**
     * 是否是广播（暂时没用）
     */
    private Boolean isBroadcast;

}
