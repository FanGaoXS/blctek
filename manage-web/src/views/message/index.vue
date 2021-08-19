<template>
  <div class="app-container">
    <h3>对方：{{yourself}}</h3>
    <h3>我自己：{{myself}}</h3>
    <ul>
      <li v-for="item in messageList" :key="item.id">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "index",
  beforeCreate() {
    const width = 800
    const height = 800
    window.resizeTo(width,height) //窗口尺寸调整至800x800
  },
  data() {
    return {
      title: 'message',
      messageList: [
        {
          id: 0,
          from: 'admin',
          to: 'driver',
          time: new Date(),
          content: '这是一条来自admin发给driver的信息1'
        },
        {
          id: 1,
          from: 'admin',
          to: 'driver',
          time: new Date(),
          content: '这是一条来自admin发给driver的信息2'
        },
        {
          id: 2,
          from: 'admin',
          to: 'driver',
          time: new Date(),
          content: '这是一条来自admin发给driver的信息3'
        },
        {
          id: 3,
          from: 'driver',
          to: 'admin',
          time: new Date(),
          content: '这是一条来自driver发给admin的信息1'
        }
      ]
    }
  },
  methods: {

  },
  computed: {
    myself() {
      const myself = {
        id: this.$store.getters.id,
        name: this.$store.getters.name
      } //从store中获得myself的信息
      console.log('我自己->',myself.name)
      return myself;
    },
    yourself() {
      const yourself = this.$route.query.yourself //从query中获得对方的信息
      console.log('对方->', yourself)
      return yourself;
    }
  },
}
</script>

<style scoped>

</style>
