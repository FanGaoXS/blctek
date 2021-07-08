<template>
  <div class="app-container">
    <el-card shadow="hover">
      <el-table
        v-loading="listLoading"
        max-height="800"
        height="750"
        border
        stripe
        highlight-current-row
        :data="list">
<!--        <el-table-column
          prop="id"
          label="编号"
          width="180">
        </el-table-column>-->
        <el-table-column
          align="center"
          label="头像"
          width="180">
          <template slot-scope="scope">
            <el-image
              style="width: 50px;height: 50px"
              :src="scope.row.avatar"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="昵称"
          width="500">
        </el-table-column>
        <el-table-column
          align="center"
          label="登记时间"
          min-width="500">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.time | timeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          width="300">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="medium"
              round
              icon="el-icon-delete"
              @click="handleRemoveUserButton(scope.row,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px"
        :total="listQuery.totalSize"
        layout="total"></el-pagination>
    </el-card>
  </div>
</template>

<script>

import {
  selectUserList,
  removeUser
} from "@/api/lottery/user";

export default {
  name: "index",
  filters: {
    timeFilter(value) {
      return new Date(value).toLocaleString();
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    async fetchList() {
      this.listLoading = true
      const { data:list } = await selectUserList()
      // console.log(list)
      this.list = list.items
      this.listQuery.totalSize = list.totalSize
      this.listLoading = false
    },
    handleRemoveUserButton(row,index){
      // console.log(row,index)
      this.$confirm('此操作将永久删除用户的登记记录, 是否继续?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        removeUser(row.id).then(res=>{
          // console.log(res)
          this.$notify({
            title: res.data?'成功':'失败',
            type: res.data?'success':'error'
          })
          this.fetchList()
        })
      }).catch(()=>{})
    },
  },
  data() {
    return {
      listLoading: true,
      listQuery:{
        totalSize: undefined,
        currentPage: 1,
        pageSize: 10
      },
      list: []
    }
  },
}
</script>

<style scoped>

</style>
