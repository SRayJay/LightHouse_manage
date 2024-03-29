import request from './../utils/request'

export default{
    login(params){
        return request({
            url:'/admin/login',
            method:'post',
            data:params,
            // mock:false
        })
    },
    getUserList(params){
        return request({
            url:'/admin/getUserList',
            method:'get',
            data:params
        })
    },
    getBookList(params){
        return request({
            url:'/admin/getBookList',
            method:'get',
            data:params
        }) 
    },
    getAuthors(params){
        return request({
            url:'/author/getAuthors',
            method:'get',
            data:params
        })
    },
    addAuthor(params){
        return request({
            url:'/author/addAuthor',
            method:'post',
            data:params
        })
    },
    deleteAuthor(params){
        return request({
            url:'/author/deleteAuthor',
            method:'post',
            data:params
        })
    },
    getPublishers(params){
        return request({
            url:'/other/getPublishers',
            method:'get',
            data:params
        })
    },
    getProducers(params){
        return request({
            url:'/other/getProducers',
            method:'get',
            data:params
        })
    },
    addPublisher(params){
        return request({
            url:'/other/addPublisher',
            method:'post',
            data:params
        })
    },
    addProducer(params){
        return request({
            url:'/other/addProducer',
            method:'post',
            data:params
        })
    },
    addBook(params){
        return request({
            url:'/admin/addBook',
            method:'post',
            data:params
        })
    },
    deleteBook(params){
        return request({
            url:'/admin/deleteBook',
            method:'post',
            data:params
        })
    },
    addSeries(params){
        return request({
            url:'/other/addSeries',
            method:'post',
            data:params
        })
    },
    getMoments(data){
        return request({
            url:'/admin/getMoments',
            method:'get',
            data
        })
    },
    getComments(data){
        return request({
            url:'/admin/getComments',
            method:'get',
            data
        })
    },
    searchBooks(data){
        return request({
            url:'/book/searchBooks',
            method:'get',
            data
        })
    }
}