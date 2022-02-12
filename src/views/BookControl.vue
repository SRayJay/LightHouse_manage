<template>
    <div>
        <div class="headline">
            <a-button type="primary" @click="showAddBook = true">添加书籍</a-button>
            <a-input-search
                v-model="searchtext"
                class="searchBar"
                placeholder="搜索书籍"
                style="width: 200px"
                @search="onSearch"
            />
        </div>
        <a-table :dataSource="dataSource" :columns="columns"></a-table>
        <a-modal v-model:visible="showAddBook" title="添加书籍" @ok="addBook">
            <a-form :model="bookState">
                <a-form-item label="书名">
                    <a-input v-model:value="bookState.name" />
                </a-form-item>
                <a-form-item label="作者">
                    <a-input></a-input>
                </a-form-item>
                <a-form-item label="出版社">
                    <a-input></a-input>
                </a-form-item>
                <a-form-item label="出品方">
                    <a-input></a-input>
                </a-form-item>
                <a-form-item label="ISBN">
                    <a-input></a-input>
                </a-form-item>
                <a-form-item label="出版时间">
                    <a-input></a-input>
                </a-form-item>
                <a-form-item label="简介">
                    <a-textarea v-model:value="bookState.intro"></a-textarea>
                </a-form-item>
                <a-form-item label="封面图片">
                    <a-upload
                        name="avatar"
                        list-type="picture-card"
                        class="avatar-uploader"
                        :show-upload-list="false"
                        :beforeUpload="beforeUpload"
                        action="http://localhost:5000/book/uploadCover"
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
import { Book } from '../types/global'
import { message } from "ant-design-vue";

function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
}
let searchtext = ref<String>('');
let showAddBook = ref<Boolean>(false);
let bookState = reactive({
    name: '',
    intro: '',
    author: '',
})
const onSearch = () => {

}
const addBook = () => {

}

const dataSource = reactive<Book[]>([])

const columns = [
    {
        title: '书名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '简介',
        dataIndex: 'intro',
        key: 'intro',
    }
]

onMounted(() => {
    api.checkBookList().then((res) => {
        console.log(res)
        dataSource.length = 0
        res.forEach(e => {
            dataSource.push(e)
        });
    })
})

// 上传图片模块
const fileList = ref([]);
const imageUrl = ref<string>("");
const trueImageUrl = ref<string>("");
// 图片上传状态改变时
const handleChange = (info) => {
    if (info.file.status === "done") {
        // 上传成功时拿到真正头像的url
        getBase64(info.file.originFileObj, (base64Url: string) => {
            imageUrl.value = base64Url;
            // loading.value = false;
            console.log(info.file.response.url);
            trueImageUrl.value = info.file.response.url;
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