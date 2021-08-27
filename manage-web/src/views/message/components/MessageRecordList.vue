<template>
  <div>
    <!-- 无限滚动组件 -->
    <infinite-loading
      spinner="waveDots"
      :distance="200"
      direction="top" @infinite="infiniteHandler">
      <div slot="no-results">没有消息记录 :(</div>
      <div slot="no-more">消息记录加载完毕 :)</div>
    </infinite-loading>

    <div v-for="(item, $index) in messageList" :key="item.id">
      <message-record
        :is-left="!(item.sender === myself.username)"
        :time="item.sendTime | timeFilter"
        :username="item.sender"
        :record="item.content"
      ></message-record>
    </div>
  </div>
</template>

<script>

import InfiniteLoading from "vue-infinite-loading";

import MessageRecord from "@/views/message/components/MessageRecord";

import {
  getMessageListByPlateNumber
} from "@/api/message";

import {
  timeFilter
} from "@/utils/global-filters";

export default {
  filters: {
    timeFilter
  },
  components:{
    MessageRecord,
    InfiniteLoading
  },
  props: {
    plateNumber: {
      type: String,
      default: '川ABP369'
    },
    myself: {
      type: Object,
      default() {
        return {
          username: 'wuqingke'
        };
      }
    }
  },
  data() {
    return {
      messageList: [],
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        totalSize: 0
      }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    getMessageListByPlateNumber() {
      return getMessageListByPlateNumber(this.plateNumber, this.listQuery.currentPage, this.listQuery.pageSize);
    },
    fetchData() {

    },
    infiniteHandler($state) {
      this.getMessageListByPlateNumber().then(res => {
        // console.log(res)
        const {data} = res;
        if (data.items.length) { //如果请求的数据的数组有长度（代表有数据）
          this.messageList.unshift(...data.items.reverse());//当前list添加请求到的list
          this.listQuery.currentPage = data.currentPage;
          this.listQuery.pageSize = data.pageSize;
          this.listQuery.totalSize = data.totalSize;
          $state.loaded();  //此次数据加载完毕
          this.listQuery.currentPage += 1;  //页码+1，方便下一次加载
        } else {  //没有数据了
          $state.complete();  //不再加载
        }
      })

    },
  }
}
</script>

<style scoped>

</style>
