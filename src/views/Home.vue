<template>
  <div class="basic_layout">
    <div class="nav_side">
      <div class="logo_bar">管理系统</div>
      <a-menu
        mode="vertical"
        @click="handleClick"
        :openKeys="openKeys"
        :selectedKeys="selectedKeys"
        theme="dark"
      >
        <a-menu-item key="1">
          <template #icon>
            <UserOutlined></UserOutlined>
          </template>
          <span>用户管理</span>
        </a-menu-item>
        <a-menu-item key="2">
          <template #icon>
            <BookOutlined />
          </template>
          <span>书籍管理</span>
        </a-menu-item>
        <a-menu-item key="3">
          <template #icon>
            <BookOutlined />
          </template>
          <span>作者管理</span>
        </a-menu-item>
        <a-menu-item key="4">
          <template #icon>
            <BookOutlined />
          </template>
          <span>出版社管理</span>
        </a-menu-item>
        <a-menu-item key="5">
          <template #icon>
            <BookOutlined />
          </template>
          <span>出品方管理</span>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="content_right">
      <div class="nav_top flex-between">
        <div class="bread pl20">面包屑</div>
        <div class="admin pr20">用户</div>
      </div>
      <div class="wrapper">
        <router-view class="main"></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UserOutlined, BookOutlined } from '@ant-design/icons-vue';
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
let selectedKeys = ref<Array<string>>([])
let openKeys = ref<Array<string>>([])
let router = useRouter()
// import {useRouter } from 'vue-router'
// const router = useRouter()
// const toWelcome = () =>{
//   router.push('/welcome')
// }
// const toLogin = () =>{
//   router.push('/login')
// }
const handleClick = (e) => {
  console.log(e.key);
  selectedKeys.value = [e.key]
  switch (e.key) {
    case '1':
      router.push('/usercontrol');
      break;
    case '2':
      router.push('/bookcontrol')
      break;
    case '3':
      router.push('/authorcontrol')
      break;
    case '4':
      router.push('/publishercontrol');
      break;
    case '5':
      router.push('/producercontrol');
      break;
  }
};
</script>

<style lang="scss" scoped>
.basic_layout {
  position: relative;
  .nav_side {
    height: 100vh;
    width: 200px;
    background-color: #001529;
    position: fixed;
    .logo_bar {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      // background: white;
      font-size: 24px;
      color: white;
    }
  }

  .content_right {
    margin-left: 200px;
    .nav_top {
      height: 60px;
      line-height: 60px;
      // border-bottom: 1px solid red;
    }
    .wrapper {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 60px);
      .main {
        height: 100%;
        // background-color: ;
      }
    }
  }
}
</style>
