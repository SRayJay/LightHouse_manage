<template>
    <div>
        <div class="headline">
            <a-button type="primary" @click="showAddPublisher = true">添加出版社</a-button>
        </div>
        <a-table :dataSource="dataSource" :columns="columns">
            <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'logo'">
                    <a-image :width="100" :src="config.BASEURL + record.logo" />
                </template>
                <template v-else-if="column.dataIndex === 'operation'">
                    <a-button @click="startAddSeries(record)">添加丛书</a-button>
                </template>
                <template v-else-if="column.dataIndex === 'series'">
                    <p v-for="i in record.series">《{{ i.name }}》</p>
                </template>
            </template>
        </a-table>
        <a-modal v-model:visible="showAddSeries" title="添加丛书" @ok="addSeries">
            <a-form :model="seriesState">
                <a-form-item label="丛书名称">
                    <a-input v-model:value="seriesState.name"></a-input>
                </a-form-item>
                <a-form-item label="册数">
                    <a-input v-model:value="seriesState.count"></a-input>
                </a-form-item>
            </a-form>
        </a-modal>
        <a-modal v-model:visible="showAddPublisher" title="添加出版社" @ok="addPublisher">
            <a-form :model="publisherState">
                <a-form-item label="出版社名">
                    <a-input v-model:value="publisherState.name" />
                </a-form-item>

                <a-form-item label="简介">
                    <a-textarea v-model:value="publisherState.intro"></a-textarea>
                </a-form-item>

                <a-form-item label="Logo">
                    <a-upload
                        name="avatar"
                        list-type="picture-card"
                        class="avatar-uploader"
                        :show-upload-list="false"
                        :beforeUpload="beforeUpload"
                        action="http://120.53.125.13:5000/upload/logo"
                        @change="handleChange"
                    >
                        <img class="avatar" v-if="imageUrl" :src="imageUrl" alt="avatar" />
                        <div class="avatar" v-else>
                            <img class="defaultAvatar" />
                        </div>
                    </a-upload>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import api from '../api'
import Util from '../utils/utils'
import { message } from 'ant-design-vue'
import config from '../config'
let showAddPublisher = ref<boolean>(false)

const dataSource = reactive([])

const columns = [
    {
        title: '出版社名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '简介',
        dataIndex: 'intro',
        key: 'intro',
    }, {
        title: '丛书',
        dataIndex: 'series',
        key: 'series'
    }, {
        title: 'Logo',
        dataIndex: 'logo',
        key: 'logo'
    }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation'
    }
]
let publisherState = reactive({
    name: '',
    intro: '',
    logo: ''
})
const addPublisher = () => {
    console.log(publisherState)
    api.addPublisher(publisherState).then((res) => {
        console.log(res)
        showAddPublisher.value = false
        publisherState = { name: '', intro: '', logo: '' }
        getPublishers()
    })
}

let showAddSeries = ref<boolean>(false)
let seriesState = reactive({
    name: '',
    count: 0,
    pubId: ''
})
const startAddSeries = (record) => {
    console.log(record)
    seriesState.pubId = record._id;
    showAddSeries.value = true
}
const addSeries = () => {
    api.addSeries(seriesState).then(res => {
        showAddSeries.value = false
        getPublishers()
    })
}

// 上传图片模块
const fileList = ref([]);
const imageUrl = ref<string>("");
const trueImageUrl = ref<string>("");
// 图片上传状态改变时
const handleChange = (info) => {
    if (info.file.status === "done") {
        // 上传成功时拿到真正头像的url
        Util.getBase64(info.file.originFileObj, (base64Url: string) => {
            imageUrl.value = base64Url;
            // loading.value = false;
            console.log(info.file.response.url);
            trueImageUrl.value = info.file.response.url;
            publisherState.logo = info.file.response.data;
        });
    }
    if (info.file.status === "error") {
        message.error("upload error");
    }
};
// 校验文件
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === 'image/svg+xml' || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("只能上传jpg、svg或png格式的图片");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("图片必须小于2MB");
    }
    return isJpgOrPng && isLt2M;
};
onMounted(() => {
    getPublishers()
})
function getPublishers() {
    api.getPublishers().then((res) => {
        dataSource.length = 0
        res.forEach(e => {
            dataSource.push(e)
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