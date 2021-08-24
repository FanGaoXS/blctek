package com.blctek.messageserver.mapper;

import com.blctek.messageserver.pojo.Message;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 *
 * @Auther: 吴青珂
 * @Date: 2021/08/24/14:59
 * @Description:
 */
@Mapper
@Repository
public interface MessageMapper {

    /**
     * 增加一条记录
     *
     * @param message 消息对象
     * @return 增加成功的记录数
     */
    Integer insertOne(Message message);

    /**
     * 删除一条记录
     *
     * @param message 消息对象
     * @return 删除成功的记录数
     */
    Integer deleteOne(Message message);

    /**
     * 修改一条记录
     *
     * @param message 消息对象
     * @return 修改成功的记录数
     */
    Integer updateOne(Message message);

    /**
     * 查询所有集合（可分页，可多条件，可单条件）
     *
     * @param message 消息对象
     * @return message集合
     */
    List<Message> selectList(Message message);

    /**
     * 查询一条message记录（可多条件，可单条件）
     *
     * @param message 消息对象
     * @return 一条消息对象
     */
    Message selectOne(Message message);

    /**
     * 查询记录数（可条件查询）
     *
     * @param message 消息对象
     * @return 记录数
     */
    Long count(Message message);

}
