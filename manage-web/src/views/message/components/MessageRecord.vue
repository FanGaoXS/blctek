<template>
  <el-row type="flex" :justify="isLeft?'start':'end'">
    <el-col :span="18">
      <p :class="'record-time '+(isLeft?'':'text-to-right')">{{time}}</p>
      <p :class="'record-username '+(isLeft?'':'text-to-right')">{{username}}</p>
      <p :class="'record-text '+(isLeft?'':'text-to-right')">{{record}}</p>
    </el-col>
  </el-row>
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
    username: {
      type: String,
      default: '用户名'
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

.record-username {
  font-size: 13px;
  font-weight: bold;
}

.record-text {
  font-size: 16px;
}

.text-to-right {
  text-align: right;
}
</style>
