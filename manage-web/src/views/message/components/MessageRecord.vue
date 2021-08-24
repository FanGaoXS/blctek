<template>
  <div>
    <el-row type="flex" :justify="isLeft?'start':'end'">
      <el-col :span="18">
        <p :class="'record-time '+(isLeft?'':'text-to-right')">{{time}}</p>
        <p :class="'record-text '+(isLeft?'':'text-to-right')">{{record}}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "MessageRecord",
  props: {
    isLeft: {
      type: Boolean,
      default: false
    },
    time: {
      type: String,
      default: '2020-2-20'
    },
    record: {
      type: String,
      default: '聊天内容'
    }
  }
}
</script>

<style scoped>
.record-time {
  font-size: 12px;
}
.record-text {
  font-size: 14px;
}
.text-to-right {
  text-align: right;
}
</style>
