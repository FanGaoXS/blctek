<template>
  <el-amap
    vid="aMap"
    class="aMap"
    :zoom="zoom"
    :center="center"
    :plugin="plugins">

    <template v-for=" marker in markerList " v-if="marker.isOnline">
      <!-- 坐标点图标 -->
      <el-amap-marker
        :position="marker.nowPoint"
        :title="marker.plateNumber">
      </el-amap-marker>
      <!-- 坐标点文字描述 -->
      <el-amap-text
        :position="marker.nowPoint"
        :offset="[0,-50]"
        :text="marker.plateNumber|plateNumberFilter">
      </el-amap-text>
    </template>

  </el-amap>
</template>

<script>
import {plateNumberFilter} from "@/utils/global-filters";
export default {
  filters: {
    plateNumberFilter
  },
  name: "Map",
  props: {
    //坐标点数组
    markerList: {
      type: Array,
      default() {
        return undefined;
      }
    },
    //地图中心点
    center: {
      type: Array,
      default(){
        return [91.171961,29.653482] //拉萨市政府
      }
    },
  },
  data() {
    return {
      title: '我是BMap组件',
      plugins:[
        { pName: 'MapType', defaultType: 0,},//地图类型插件（卫星或普通地图）0是普通地图，1是卫星。默认是0
        { pName: 'Scale'},// 比例尺插件
        { pName: 'ToolBar',}// 左侧工具条插件
      ],
      //比例尺比例：pc是[3-18]，mobile是[3-19]
      zoom: 12
    }
  },
}
</script>

<style scoped>
.aMap {
  height: 650px;
}
</style>
