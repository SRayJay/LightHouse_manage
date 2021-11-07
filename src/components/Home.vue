<template>
  <div>
    <h1>Home</h1>
    <button @click="toWelcome">欢迎</button>
    <button @click="toLogin">登录</button>

    <!-- <button @click=""></button> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import {useRouter } from 'vue-router'
const router = useRouter()
const toWelcome = () =>{
  router.push('/welcome')
}
const toLogin = () =>{
  router.push('/login')
}
</script>

<style>

</style>
