<template>
  <div class="app-container">
    <el-card shadow="hover">
      <el-table
        max-height="800"
        height="800"
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
          <el-button>删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "index",
  filters: {
    timeFilter(value) {
      return new Date(value).toLocaleString();
    }
  },
  data() {
    return {
      list: [
        {
          id: 0,
          name: '好了好了我知道了',
          avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/ybONbOCb9TajjQLSAx2mpgL0ibzTwxPwLNgo6T0Z7iaGH7ef1UweNl9bIzS1zeyWARdy3kTIYkAAFEy5tm87OYHg/132',
          time: new Date()
        },
        {
          id: 1,
          name: '好了好了我知道了',
          avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/ybONbOCb9TajjQLSAx2mpgL0ibzTwxPwLNgo6T0Z7iaGH7ef1UweNl9bIzS1zeyWARdy3kTIYkAAFEy5tm87OYHg/132',
          time: new Date()
        }
      ]
    }
  },
}
</script>

<style scoped>

</style>
