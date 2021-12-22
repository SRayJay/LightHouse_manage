<template>
  <div class="basic_layout">
    <div class="nav_side">

    </div>
    <div class="content_right">
      <div class="nav_top flex-between">
        <div class="bread pl20">面包屑</div>
        <div class="admin pr20">用户</div>
      </div>
      <div class="wrapper">
        <router-view class="main green"></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import {useRouter } from 'vue-router'
// const router = useRouter()
// const toWelcome = () =>{
//   router.push('/welcome')
// }
// const toLogin = () =>{
//   router.push('/login')
// }
</script>

<style lang="scss" scoped>
.basic_layout{
  position:relative;
  .nav_side{
    height:100vh;
    width: 200px;
    background-color: #001529;
    position: fixed;
    
  }

  .content_right{
    margin-left: 200px;
    .nav_top{
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid red;
    }
    .wrapper{
      background:#eef0f3;
      padding: 20px;
      height: calc(100vh - 60px);
      .main{
        height: 100%;
        // background-color: ;
      }
    }
  }
}
</style>
