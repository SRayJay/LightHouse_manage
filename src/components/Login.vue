<template>
 <div>
   <h1 @click="login">Login</h1>
 </div>
</template>

<script lang="ts" setup>
import request from './../utils/request'
function login(){
  request.get('/login',{name:'we'}).then((res)=>{
    console.log(res)
  })
}
</script>

<style scoped lang="scss">

</style>
