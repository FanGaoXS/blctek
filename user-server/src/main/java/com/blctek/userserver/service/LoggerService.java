package com.blctek.userserver.service;

import com.blctek.userserver.pojo.Logger;
import org.springframework.stereotype.Service;

/**
 * Created with IntelliJ IDEA.
 *
 * @Auther: 吴青珂
 * @Date: 2021/03/05/13:26
 * @Description: 日志表的业务
 */
@Service
public interface LoggerService {

    /**
     * 新增一条日志
     * @param logger    日志对象
     * @return  成功新增日志的记录数
     */
    Integer insertLogger(Logger logger);
}
