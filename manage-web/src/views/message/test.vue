<template>
  <div class="app-container">
    <div v-for="(item, $index) in list" :key="$index">
      {{item}}
    </div>

<!--    <infinite-loading @infinite="infiniteHandler"></infinite-loading>-->
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";

import {
  getLoggerList
} from "@/api/logger";

export default {
  components:{
    InfiniteLoading
  },
  data() {
    return {
      page: 1,
      list: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData(){
      this.fetchList();
    },
    fetchList(){
      getLoggerList(null,null,1,10).then(({data})=>{
        console.log(data);
        this.list = data.items;
      })
    },
    infiniteHandler($state) {
      getLoggerList(null,null,1,200).then(({ data }) => {
        console.log(data);
        if (data.items.length) {  //有数据
          this.page += 1;
          this.list.push(...data.items);
          $state.loaded();      //此次获取的数据加载完
        } else {
          $state.complete();    //没有数据了
        }
      });
    },
  },
};
</script>

<style scoped>

</style>
