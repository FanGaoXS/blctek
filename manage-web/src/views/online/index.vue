<template>
  <div class="app-container">
    <el-card shadow="hover">

      <el-row :gutter="20">
        <el-col :span="18">
          <div class="bg-purple">
            <b-map
              :marker-list="engineerList"
              :center="center">
            </b-map>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bg-purple-dark">
            <el-table
              :data="engineerList"
            >
              <el-table-column
                prop="plateNumber"
                label="车牌"
                width="150">
              </el-table-column>

              <el-table-column
                label="状态"
                width="100">
                <template slot-scope="{row}">
                  <el-tag
                    :type="row.isOnline?'success':'danger'"
                    effect="dark"
                  >{{row.isOnline | isOnlineFilter }}</el-tag>
                </template>
              </el-table-column>

              <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                  <el-button
                    @click="handleButtonClick(scope.row)"
                    type="primary"
                    size="small"
                    :disabled="!scope.row.isOnline"
                    round>在地图上查看</el-button>
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
import BMap from "./components/BMap";
export default {
  name: "index",
  filters: {
    isOnlineFilter(value) {
      const statusMap = {
        true: '在线',
        false: '离线'
      }
      return statusMap[value];
    }
  },
  components:{
    BMap
  },
  data() {
    return {
      title: '在线监理',
      center: undefined,
      engineerList: [
        {
          plateNumber: '川ABP369',
          isOnline: false,
          nowPoint: [91.171961,29.653482] //拉萨市政府
        },
        {
          plateNumber: '川A46J5E',
          isOnline: true,
          nowPoint: [91.100893,29.657435] //西藏大厦
        },
        {
          plateNumber: '川AF41J3',
          isOnline: false,
          nowPoint: [91.126471,29.697108] //军区总医院
        },
        {
          plateNumber: '川A79D5H',
          isOnline: true,
          nowPoint: [91.119261,29.654452] //布达拉宫
        },
        {
          plateNumber: '川AS28T4',
          isOnline: true,
          nowPoint: [91.061239,29.642666] //第二医院
        },
      ]
    }
  },
  methods: {
    handleButtonClick(row) {
      this.center = row.nowPoint
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
