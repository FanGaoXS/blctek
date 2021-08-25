<template>
  <div class="app-container">
    <el-card shadow="hover">

      <el-row :gutter="20">
        <el-col :span="15">
          <div class="bg-purple">
            <!-- 传递点坐标数组和地图中心点（只传递isOnline为true的对象） -->
            <b-map
              :marker-list="engineerList.filter(item=>{return item.isOnline === true})"
              :center="center">
            </b-map>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="bg-purple-dark">
            <el-table
              :data="engineerList">

              <el-table-column
                label="车牌"
                align="center"
                width="100">
                <template slot-scope="{row}">
                  {{row.plateNumber | plateNumberFilter}}
                </template>
              </el-table-column>

              <el-table-column
                label="状态"
                align="center"
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
                align="center"
                min-width="280">
                <template slot-scope="scope">
<!--                  <el-button
                    @click="handleButtonClick(scope.row)"
                    type="primary"
                    size="medium"
                    round
                    icon="el-icon-map-location"
                    :disabled="!scope.row.isOnline"
                    >在地图上查看</el-button>-->
                  <el-badge is-dot :hidden="false" style="margin: 10px">
                    <el-button
                      type="warning"
                      size="medium"
                      icon="el-icon-chat-line-round"
                      round
                      @click="handleMessageButtonClick(scope.row)"
                      >查看消息</el-button>
                    <el-button
                      type="warning"
                      size="medium"
                      icon="el-icon-chat-line-round"
                      round
                      @click="handleMessageButtonClickTest(scope.row)"
                    >查看消息-测试</el-button>
                  </el-badge>
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

import {
  plateNumberFilter
} from "@/utils/global-filters";

export default {
  name: "index",
  filters: {
    plateNumberFilter,
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
  created() {

  },
  methods: {
    handleButtonClick(row) {
      // 切换当前地图中心点到选中的车辆的当前坐标点
      this.center = row.nowPoint
    },
    handleMessageButtonClick(row){
      //console.log(row);
      // router的resolve对象
      let resolve = this.$router.resolve({
        path: '/message',
        query: {
          plateNumber: row.plateNumber
        }
      });
      // features参数，参看https://www.w3school.com.cn/jsref/met_win_open.asp
      window.open(resolve.href,'_blank','width=800,height=800,left=100,top=100,resizable=0'); //取href，然后利用window.open以_blank（新的标签页）的方式打开
    },
    handleMessageButtonClickTest(row){
      //console.log(row);
      // router的resolve对象
      let resolve = this.$router.resolve({
        path: '/message-test',
        query: {
          plateNumber: row.plateNumber
        }
      });
      // features参数，参看https://www.w3school.com.cn/jsref/met_win_open.asp
      window.open(resolve.href,'_blank','width=800,height=800,left=100,top=100,resizable=0'); //取href，然后利用window.open以_blank（新的标签页）的方式打开
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
