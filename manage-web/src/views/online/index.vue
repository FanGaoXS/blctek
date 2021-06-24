<template>
  <div class="app-container">
    <el-card shadow="hover">

      <el-row :gutter="20">
        <el-col :span="18">
          <div class="bg-purple">
            <b-map
              :center="center"
            ></b-map>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bg-purple-dark">
            <el-table
              :data="centerList"
            >
              <el-table-column
                prop="name"
                label="地名"
                width="300">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="handleButtonClick(scope.row)" type="primary" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>

<script>
import BMap from "./components/Map";
export default {
  name: "index",
  components:{
    BMap
  },
  data() {
    return {
      title: '在线监理',
      center: undefined,
      centerList: [
        {
          name: '成都',
          point: [104.066143,30.573095]
        },
        {
          name: '北京',
          point: [116.322056,39.89491]
        },
        {
          name: '拉萨',
          point: [91.171961,29.653482]
        }
      ]
    }
  },
  methods: {
    handleButtonClick(row) {
      this.center = row.point
    }
  },
}
</script>

<style scoped>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
</style>
