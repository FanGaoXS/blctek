<template>
  <el-amap
    vid="aMap"
    class="aMap"
    :zoom="zoom"
    :center="center"
    :plugin="plugins">
    <template v-for=" marker in markerList " v-if="marker.isOnline">
      <el-amap-marker
        :position="marker.nowPoint"
        :title="marker.plateNumber">
      </el-amap-marker>
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
    markerList: {
      type: Array,
      default() {
        return undefined;
      }
    },
    center: {
      type: Array,
      default(){
        return [104.066143,30.573095] //默认中心点位置
      }
    },
    zoom: {
      type: Number,
      default: 14
    }
  },
  data() {
    return {
      title: '我是BMap组件',
      plugins:[
        { //地图类型插件（卫星或普通地图）
          pName: 'MapType',
          defaultType: 0, // 0是普通地图，1是卫星。默认是0
        },
        { // 比例尺插件
          pName: 'Scale',
        },
        { // 左侧工具条插件
          pName: 'ToolBar',
        }
      ],
    }
  },
}
</script>

<style scoped>
.aMap {
  height: 650px;
}
</style>
