<template>
    <div>
        <div class="headline">
            <a-button type="primary" @click="startAddBook">添加书籍</a-button>
            <a-input-search
                v-model="searchtext"
                class="searchBar"
                placeholder="搜索书籍"
                style="width: 200px"
                @search="onSearch"
            />
        </div>
        <a-table :dataSource="dataSource" :columns="columns">
            <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'cover'">
                    <a-image :width="100" :src="config.BASEURL + record.cover" />
                </template>
                <template v-else-if="column.dataIndex === 'operation'">
                <a>编辑</a>/
                    <a-popconfirm
                        v-if="dataSource.length"
                        title="确定删除?"
                        @confirm="deleteBook(record.name)"
                    >
                        <a>删除</a>
                    </a-popconfirm>
                    
                </template>
                
            </template>
        </a-table>
        <a-modal v-model:visible="showAddBook" title="添加书籍" @ok="addBook">
            <a-form :model="bookState">
                <a-form-item label="书名">
                    <a-input v-model:value="bookState.name" />
                </a-form-item>
                <a-form-item label="作者">
                    <a-auto-complete v-model:value="bookState.author" :options="authorlist"></a-auto-complete>
                </a-form-item>
                <a-form-item label="出版社">
                    <a-auto-complete v-model:value="bookState.publisher" :options="publisherlist"></a-auto-complete>
                </a-form-item>
                <a-form-item label="出品方">
                    <a-auto-complete v-model:value="bookState.producer" :options="producerlist"></a-auto-complete>
                </a-form-item>
                <a-form-item label="译者">
                    <a-input v-model:value="bookState.translator"></a-input>
                </a-form-item>

                <a-form-item label="丛书">
                    <a-input v-model:value="bookState.series"></a-input>
                </a-form-item>
                <a-form-item label="ISBN">
                    <a-input v-model:value="bookState.ISBN"></a-input>
                </a-form-item>
                <a-form-item label="出版时间">
                    <a-input v-model:value="bookState.publishTime"></a-input>
                </a-form-item>
                <a-form-item label="所属">
                    <a-input v-model:value="bookState.belong"></a-input>
                </a-form-item>
                <a-form-item label="分类">
                    <a-input v-model:value="bookState.classify"></a-input>
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
                        action="http://120.53.125.13:5000/upload/cover"
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
import { Book, Author } from '../types/global'
import { message } from "ant-design-vue";
import config from '../config'
import Util from '../utils/utils'
interface autoComplete {
    value: string
}
let searchtext = ref<String>('');
let showAddBook = ref<Boolean>(false);
let bookState = reactive({
    name: '',
    intro: '',
    author: '',
    publisher: '',
    producer: '',
    publishTime: '',
    translator: '',
    series: '',
    ISBN: '',
    belong: '',
    classify: '',
    cover: ''
})
const onSearch = () => {

}
const deleteBook = (name) => {
    api.deleteBook({ 'name': name }).then(res => {
        console.log(res)
        getBooks()
    })
}
function getBooks() {
    api.getBookList().then((res) => {
        dataSource.length = 0
        res.forEach(e => {
            dataSource.push(e)
        });
    })
}
let authorlist = reactive<autoComplete[]>([])
let publisherlist = reactive<autoComplete[]>([])
let producerlist = reactive<autoComplete[]>([])
const startAddBook = () => {
    showAddBook.value = true
}
const addBook = () => {
    console.log(bookState)
    api.addBook(bookState).then(res => {
        console.log(res)
        showAddBook.value = false
        bookState.name = '';
        bookState.producer = '';
        bookState.publishTime = '';
        bookState.publisher = '';
        bookState.ISBN = '';
        bookState.author = '';
        bookState.cover = '';
        bookState.intro = '';
        bookState.translator = '';
        bookState.series = '';
        bookState.classify = '';
        bookState.belong = '';
        imageUrl.value = '';
        getBooks()

    })
}

const dataSource = reactive<Book[]>([])

const columns = [
    {
        title: '书名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '作者',
        dataIndex: 'author.name',
        key: 'author',
    }, {
        title: '简介',
        dataIndex: 'intro',
        key: 'intro',
        ellipsis: true,
    }, {
        title: '出版社',
        dataIndex: 'publisher',
        key: 'publisher',
    },
    {
        title: '出品方',
        dataIndex: 'producer',
        key: 'producer',
    },
    {
        title: '出版时间',
        dataIndex: 'publishTime',
        key: 'publishTime',
    }, {
        title: '译者',
        dataIndex: 'translator',
        key: 'translator'
    }, {
        title: '丛书',
        dataIndex: 'series',
        key: 'series'
    },
    {
        title: '所属',
        dataIndex: 'belong'
    },
    {
        title: '分类',
        dataIndex: 'classify'
    }, {
        title: 'ISBN',
        dataIndex: 'ISBN',
        key: 'ISBN',
    }, {
        title: '封面',
        dataIndex: 'cover',
        key: 'cover'
    }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation'
    }
]



onMounted(() => {
    getBooks()
    api.getAuthors().then((res) => {
        res.forEach(e => {
            let item: autoComplete = { value: e.name }
            authorlist.push(item)
        });
    })
    api.getPublishers().then(res => {
        res.forEach(e => {
            let item: autoComplete = { value: e.name }
            publisherlist.push(item)
        });
    })
    api.getProducers().then(res => {
        res.forEach(e => {
            let item: autoComplete = { value: e.name }
            producerlist.push(item)
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
        Util.getBase64(info.file.originFileObj, (base64Url: string) => {
            imageUrl.value = base64Url;
            // loading.value = false;
            console.log(info.file.response.url);
            trueImageUrl.value = info.file.response.url;
            bookState.cover = info.file.response.data
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