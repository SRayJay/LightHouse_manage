<template>
    <a-tabs type="card" v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="动态">
            <a-table :dataSource="momentData" :columns="momentCol">
                <template #bodyCell="{ column, text, record }">
                    <template v-if="column.dataIndex === 'pics'">
                        <a-image v-for="item in text" :width="100" :src="item" />
                    </template>
                    <template v-else-if="column.dataIndex==='userName'">{{record.creator.userName}}</template>
                    <template v-else-if="column.dataIndex === 'operation'">
                        <a>删除</a>
                    </template>
                </template>
            </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="评论">
            <a-table :dataSource="commentData" :columns="commentCol">
                <template #bodyCell="{ column, text, record }">
                    <template v-if="column.dataIndex === 'logo'">
                        <a-image :width="100" :src="config.BASEURL + record.logo" />
                    </template>
                    <template v-else-if="column.dataIndex === 'series'">
                        <p v-for="i in record.series">《{{ i.name }}》</p>
                    </template>
                </template>
            </a-table>
        </a-tab-pane>
    </a-tabs>
    
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import api from '../api'
import Util from '../utils/utils'
import { message } from 'ant-design-vue'
import config from '../config'
let showAddPublisher = ref<boolean>(false)
let activeKey = ref<string>('1')
const momentData = reactive([])
const commentData = reactive([])
const momentCol = [
    {
        title: '用户',
        dataIndex: 'userName',
    },
    {
        title: '内容',
        dataIndex: 'content',
    }, {
        title: '图片',
        dataIndex: 'pics',
    }, {
        title: '发布时间',
        dataIndex: 'create_time',
    }, {
        title: '操作',
        dataIndex: 'operation',
    }
]
const commentCol = [
    {
        title: '用户',
        dataIndex: 'userName',
    },
    {
        title: '内容',
        dataIndex: 'content',
    }, {
        title: '图片',
        dataIndex: 'pics',
    }, {
        title: '发布时间',
        dataIndex: 'create_time',
    }, {
        title: '操作',
        dataIndex: 'operation',
    }
]



onMounted(() => {
    getMoments()
    getComments()
})
function getMoments() {
    api.getMoments().then((res) => {
        momentData.length = 0
        res.forEach(e => {
            momentData.push(e)
        });
    })
}
function getComments() {
    api.getComments().then((res) => {
        commentData.length = 0
        res.forEach(e => {
            commentData.push(e)
        });
    })
}
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
.avatar-uploader {
    display: block;
}
.avatar {
    border-radius: 50%;
    width: 128px;
    height: 128px;
    .defaultAvatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
}
</style>