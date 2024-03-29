package com.blctek.engineserver.mapper;

import com.blctek.engineserver.pojo.Model;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 *
 * @Auther: 吴青珂
 * @Date: 2021/03/08/20:05
 * @Description:    对model表的增删改查
 */
@Mapper
@Repository
public interface ModelMapper {

    /**
     * 增加一条记录
     *
     * @param model 类型对象
     * @return 增加成功的记录数
     */
    Integer insertOne(Model model);

    /**
     * 删除一条记录
     *
     * @param model 类型对象
     * @return 删除成功的记录数
     */
    Integer deleteOne(Model model);

    /**
     * 修改一条记录
     *
     * @param model 类型对象
     * @return 修改成功的记录数
     */
    Integer updateOne(Model model);

    /**
     * 查询所有集合（可分页，可多条件，可单条件）
     *
     * @param model 类型对象
     * @return model集合
     */
    List<Model> selectList(Model model);

    /**
     * 查询一条model记录（可多条件，可单条件）
     *
     * @param model 类型对象
     * @return 一条类型对象
     */
    Model selectOne(Model model);

    /**
     * 查询记录数（可条件查询）
     *
     * @param model 类型对象
     * @return 记录数
     */
    Long count(Model model);

}
