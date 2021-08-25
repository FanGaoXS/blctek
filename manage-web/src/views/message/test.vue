<template>
  <div class="app-container">
    <div v-for="(item, $index) in messageList" :key="$index">
      {{item}}
    </div>

    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";

import {
  getMessageListByPlateNumber
} from "@/api/message";

export default {
  components:{
    InfiniteLoading
  },
  props: {
    plateNumber: {
      type: String,
      default: '川ABP369'
    },
  },
  data() {
    return {
      currentPage: 1,
      messageList: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData(){
      this.fetchMessageList()
    },
    fetchMessageList(){
      getMessageListByPlateNumber(this.plateNumber,this.currentPage).then(res=>{
        console.log(res)
        this.messageList = res.data.items
      }).catch(error=>{
        console.log(error)
      })
    },
    infiniteHandler(){

    }

  },
};
</script>

<style scoped>

</style>
