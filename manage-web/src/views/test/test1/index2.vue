<template>
  <div>
    <el-button @click="buttonClick"></el-button>
  </div>
</template>

<script>
  import {
    getUser
  } from "@/api/user/user";

  export default {
    name: "index2",
    methods: {
      buttonClick() {
        const id = 10
        getUser(id).then(res=>{
          console.log(res)
        }).catch(error=>{
          console.log(error)
        })
      }
    },
  }
</script>

<style scoped>

</style>
