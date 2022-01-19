<template>
  <div class="login_wrapper">
    <div class="modal">
      <div class="title">管理系统</div>
      <a-form :model="admin">
        <a-form-item>
          <a-input v-model:value="admin.adminName" autocomplete="on" size="large" placeholder="用户名">
            <template #prefix>
              <user-outlined type="user" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password v-model:value="admin.adminPwd" size="large" placeholder="密码">
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" size="large" @click="login" class="btn_login">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/index.js'

const router = useRouter()

const admin = reactive({
  adminName: ref<String>(''),
  adminPwd: ref<String>('')
})

let validatePwd = async () => { }
const rules = {
  adminName: [{ require: true, trigger: "blur", validator: validatePwd }]
}
function login() {
  console.log(admin.adminName)

  api.login({ admin }).then((res) => {
    console.log(res)
    router.push('/')
  })
}
</script>

<style lang="scss">
.login_wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #45a76b;
  .modal {
    background-color: #fff;
    padding: 50px;
    width: 500px;
    border-radius: 10px;
    box-shadow: 0 0 10px #ccc;
    .title {
      font-size: 1.5em;
      text-align: center;
      padding-bottom: 2em;
    }
    .btn_login {
      width: 100%;
    }
  }
}
</style>
