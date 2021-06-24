<template>
  <el-amap
    vid="aMap"
    class="aMap"
    :zoom="zoom"
    :center="center"
    :plugin="plugins"
  >

  </el-amap>
</template>

<script>
export default {
  name: "Map",
  props: {
    center: {
      type: Array,
      default(){
        return [104.066143,30.573095]
      }
    },
  },
  data() {
    return {
      title: '我是Map组件',
      zoom: 14,
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
