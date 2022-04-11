<template>
  <div>
    <div class="headline">
      <a-input-search
        v-model="searchtext"
        class="searchBar"
        placeholder="搜索用户"
        style="width: 200px"
        @search="onSearch"
      />
    </div>
    <a-table :dataSource="dataSource" :columns="columns">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'avatar'">
          <a-image :width="100" :src="config.BASEURL + record.avatar" />
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <a>查看</a>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import api from '../api/index.js';
import config from '../config'
import { User } from '../types/global'
// interface User {
//   userName: string,
//   signature: string,
// }
let searchtext = ref<string>('')
const onSearch = (searchtext: String) => {
  console.log(searchtext)
  api.getUserList(searchtext).then(res => {
    dataSource.length = 0
    res.forEach(e => {
      dataSource.push(e)
    });
  })
}


onMounted(() => {
  api.getUserList().then((res) => {
    console.log(res)
    dataSource.length = 0
    res.forEach(e => {
      dataSource.push(e)
    });
  })
})

const dataSource = reactive<User[]>([])
const columns = [
  {
    title: '用户名',
    dataIndex: 'userName',
  },
  {
    title: '个性签名',
    dataIndex: 'signature',
  },{
    title:'城市',
    dataIndex:'city'
  }, {
    title:'上次登录',
    dataIndex:'lastLoginTime'
  },{
    title: '头像',
    dataIndex: 'avatar'
  },{
    title:'操作',
    dataIndex:'operation'
  }
]
</script>
<style lang="scss" scoped>
.headline {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .searchBar {
    margin-left: auto;
  }
}
</style>