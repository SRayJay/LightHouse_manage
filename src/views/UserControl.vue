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
    <a-table :dataSource="dataSource" :columns="columns"></a-table>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
interface User {
  name: string,
  age: number,
}
let searchtext = ref<string>('')
const onSearch = () => {
  console.log(searchtext.value)
}

import api from '../api/index.js'
onMounted(() => {
  api.checkUserList().then((res) => {
    console.log(res)
  })
})

const dataSource = reactive<User[]>([{
  name: '胡彦斌',
  age: 12
},
{
  name: '胡彦斌',
  age: 11
}])
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
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