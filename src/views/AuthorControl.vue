<template>
    <div>
        <div class="headline">
            <a-button type="primary" @click="showAddAuthor = true">添加作者</a-button>
            <a-input-search
                v-model="searchtext"
                class="searchBar"
                placeholder="搜索作者"
                style="width: 200px"
                @search="onSearch"
            />
        </div>
        <a-table :dataSource="dataSource" :columns="columns">
            <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'photo'">
                    <a-image :width="100" :src="config.BASEURL + record.photo" />
                </template>
                <template v-else-if="column.dataIndex === 'operation'">
                    <a-popconfirm
                        v-if="dataSource.length"
                        title="确定删除?"
                        @confirm="deleteAuthor(record.name)"
                    >
                        <a>删除</a>
                    </a-popconfirm>
                </template>
            </template>
        </a-table>
        <a-modal v-model:visible="showAddAuthor" title="添加作者" @ok="addAuthor">
            <a-form :model="authorState">
                <a-form-item label="姓名">
                    <a-input v-model:value="authorState.name" />
                </a-form-item>
                <a-form-item label="国籍">
                    <a-input v-model:value="authorState.country" />
                </a-form-item>
                <a-form-item label="出生日期">
                    <a-input v-model:value="authorState.birth"></a-input>
                </a-form-item>
                <a-form-item label="逝世日期">
                    <a-input v-model:value="authorState.death"></a-input>
                </a-form-item>
                <a-form-item label="简介">
                    <a-textarea v-model:value="authorState.intro"></a-textarea>
                </a-form-item>
                <a-form-item label="诺贝尔年份(无则为0)">
                    <a-input v-model:value="authorState.nobel" />
                </a-form-item>
                <a-form-item label="图片">
                    <a-upload
                        name="avatar"
                        list-type="picture-card"
                        class="avatar-uploader"
                        :show-upload-list="false"
                        :beforeUpload="beforeUpload"
                        action="http://localhost:5000/upload/author"
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
import { message } from "ant-design-vue";
import config from '../config'
let searchtext = ref<String>('');
let showAddAuthor = ref<Boolean>(false);
let authorState = reactive({
    name: '',
    country: '',
    intro: '',
    nobel: 0,
    photo: '',
    birth: '',
    death: ''
})
const dataSource = reactive([])

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '国籍',
        dataIndex: 'country',
        key: 'country',
    }, {
        title: '简介',
        dataIndex: 'intro',
        key: 'intro',
        ellipsis: true,
    },
    {
        title: '诺贝尔',
        dataIndex: 'nobel',
        key: 'nobel',
    },
    {
        title: '图片',
        dataIndex: 'photo',
        key: 'photo'
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation'
    }
]
const onSearch = () => {

}
const addAuthor = () => {
    console.log(authorState)
    api.addAuthor(authorState).then((res) => {
        console.log(res)
        showAddAuthor.value = false
        authorState = { name: '', photo: '', intro: '', country: '', nobel: null, birth: '', death: '' }
        getAuthors()
    })
}
const deleteAuthor = (name) => {
    console.log(name)
    api.deleteAuthor({ 'name': name }).then((res) => {
        console.log(res)
        getAuthors()
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
            authorState.photo = info.file.response.data
        });
    }
    if (info.file.status === "error") {
        message.error("upload error");
    }
};
// 校验文件
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("只能上传jpg或png格式的图片");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("图片必须小于2MB");
    }
    return isJpgOrPng && isLt2M;
};
onMounted(() => {
    getAuthors()
})
function getAuthors() {
    api.getAuthors().then((res) => {
        console.log(res)
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