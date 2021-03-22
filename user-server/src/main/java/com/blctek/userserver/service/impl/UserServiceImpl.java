package com.blctek.userserver.service.impl;

import com.blctek.userserver.mapper.UserMapper;
import com.blctek.userserver.pojo.User;
import com.blctek.userserver.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 *
 * @Auther: 吴青珂
 * @Date: 2021/03/02/16:56
 * @Description:
 */
@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User verify(String username, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        return userMapper.selectOne(user);
    }

    @Override
    public User selectUserByUuid(String uuid) {
        User user = new User();
        user.setUuid(uuid);
        return userMapper.selectOne(user);
    }

    @Override
    public List<User> selectUserList(Integer currentPage,
                                     Integer pageSize) {
        User user = new User();
        user.setCurrentPage(currentPage);
        user.setPageSize(pageSize);
        return userMapper.selectList(user);
    }

    @Override
    public Long selectTotalSize(User user) {
        return userMapper.count(user);
    }

}
