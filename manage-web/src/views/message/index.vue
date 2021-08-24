<template>
  <div class="app-container">
    <el-container>

      <el-header height="300">
        <el-descriptions
          border
          title="对方信息">
          <template slot="extra">
            <el-button type="primary" size="small" round>详细信息</el-button>
          </template>
          <el-descriptions-item label="车牌号">
            {{yourself.vehicleNumber | plateNumberFilter}}
          </el-descriptions-item>
          <el-descriptions-item label="车牌类型">
            <el-tag :type=" yourself.plateType | plateTypeFilter ">
              {{yourself.plateType}}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="车辆类型">
            {{yourself.model.name}}
          </el-descriptions-item>
          <el-descriptions-item label="驾驶员">
            {{yourself.driver.name}}
          </el-descriptions-item>
          <el-descriptions-item label="驾驶员联系方式">
            {{yourself.driver.phone}}
          </el-descriptions-item>
        </el-descriptions>
        <!--        <h3>我自己：{{myself}}</h3>-->
      </el-header>

      <el-main>
        <message-record
          v-for="item in recordList" :key="item.id"
          :is-left="item.to === yourself.vehicleNumber"
          :time="item.time | timeFilter "
          :record="item.content"
        ></message-record>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </el-main>

      <el-footer>
        <el-container direction="horizontal ">
          <el-input
            v-model="sendMessage"
            type="textarea">
          </el-input>
          <el-button
            style="margin-left: 20px"
            type="success"
            @click="handleSendButton()"
            plain>
            发送
          </el-button>
        </el-container>
      </el-footer>
    </el-container>
  </div>
</template>

<script>

import MessageRecord from "@/views/message/components/MessageRecord";

import {
  getVehicleByVehicleNumber
} from "@/api/engineer";

import {
  plateNumberFilter,
  plateTypeFilter,
  timeFilter
} from "@/utils/global-filters";

import {
  recordList
} from "./data";

export default {
  components:{
    MessageRecord
  },
  filters: {
    plateNumberFilter,
    plateTypeFilter,
    timeFilter
  },
  data() {
    return {
      title: 'message',
      sendMessage: '',
      recordList: recordList,
      //聊天对方
      yourself: {
        vehicleNumber: '',
        plateType: '',
        model: {
          name: ''
        },
        driver: {
          name: '',
          phone: ''
        }
      }
    }
  },
  beforeCreate() {
    const width = 800
    const height = 800
    window.resizeTo(width,height) //窗口尺寸调整至800x800
  },
  created(){
    this.fetchData()                  //拉取数据
  },
  methods: {
    fetchData(){
      this.fetchYourselfByPlateNumber();
    },
    fetchYourselfByPlateNumber(){
      getVehicleByVehicleNumber(this.plateNumber).then(res=>{
        // console.log(res.data);
        this.yourself = res.data
      })
    },
    handleSendButton(){
      this.$message({
        message: '你即将发送的内容是：'+this.sendMessage,
        type: 'success',
        duration: 2000,
        showClose: true
      })
    }
  },
  computed: {
    plateNumber() { //从route中获得plateNumber车牌号
      return this.$route.query.plateNumber;
    },
    myself() {      //聊天己方
      const myself = {
        id: this.$store.getters.id,
        username: this.$store.getters.username,
        name: this.$store.getters.name
      } //从store中获得myself的信息
      console.log('我自己->',myself.name)
      return myself;
    }
  },
}
</script>

<style scoped>

.el-header {

}

.el-main {
  margin: 20px;
  background-color: #fafafa;
  border-radius: 4px
}

.el-footer {

}
</style>
