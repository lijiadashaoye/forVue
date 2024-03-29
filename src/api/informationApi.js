import {
    AxiosGet,
    AxiosDelete,
    AxiosPost,
    AxiosPut
} from '../sets/axiosMethods';


//获取渠道
export const getAppChannel = (type) => {
    return AxiosGet(`/admin/dict/type/${type}`)
}

//图片上传地址
export const upLoadImg = (data) => {
    return AxiosPost(`/admin/file/up/setting`, data)
}
//文章列表
export const articleList = (data) => {
    return AxiosGet('/information/manager/news-article',data)
}

//新增文章
export const addArticle = (data)=> {
    return AxiosPost('/information/manager/news-article',data)
}

//修改文章
export const updateArticle = (data) => {
    return AxiosPut('/information/manager/news-article',data)
}


//更改文章状态
export const updateArticleStatus = (data) => {
    return AxiosPut(`/information/manager/news-article/status`,data)
}

//删除文章
export const deleteArticle = (id) => {
    return AxiosDelete(`/information/manager/news-article/${id}`)
}

//批量删除
export const moreDeleteArticle = (data) => {
    return AxiosPost(`/information/manager/news-article/delete-list`,data)
}





//新闻
//列表
export const newsList = (data) => {
    return AxiosGet(`/information/manager/news-setting`,data)
}

//新增
export const addNews = (data) => {
    return AxiosPost(`/information/manager/news-setting`,data)
}

//删除
export const deleteNews = (id) => {
    return AxiosDelete(`/information/manager/news-setting/${id}`)
}

//修改
export const updateNews = (data) => {
    return AxiosPut(`/information/manager/news-setting`,data)
}




//文章标签
//文章标签列表
export const articleTagsList = (data) => {
    return AxiosGet(`/information/manager/news-tags`, data)
}
//新增
export const addArticleTags = (data) => {
    return AxiosPost(`/information/manager/news-tags`,data)
}

//删除
export const deleteArticleTag = (id) => {
    return AxiosDelete(`/information/manager/news-tags/${id}`)
}

//修改
export const updateArticleTag = (data) => {
    return AxiosPut(`/information/manager/news-tags`,data)
}




//文章栏目
//列表
export const articleTypeList = (data) => {
    return AxiosGet(`/information/manager/news-type`,data)
}

//新增
export const addArticleType = (data)=> {
    return AxiosPost(`/information/manager/news-type`,data)
}

//修改
export const updateArticleType = (data) => {
    return AxiosPut(`/information/manager/news-type`,data)
}

//删除
export const deleteArticleType = (id)=> {
    return AxiosDelete(`/information/manager/news-type/${id}`)
}





//文章评论

//列表
export const articleCommentList = (data) => {
    return AxiosGet(`/information/manager/comment`,data)
}

//新增
export const addArticleComment = (data) => {
    return AxiosPost(`/information/manager/comment`,data)
}

//修改
export const updateArticleComment = (data) => {
    return AxiosPut(`/information/manager/comment`,data)
}

//删除
export const deleteArticleComment = (id) => {
    return AxiosDelete(`/information/manager/comment/${id}`)
}

//批量删除
export const moreDeleteComment = (data) => {
    return AxiosPost(`/information/manager/comment/delete-list`,data)
}

//修改评论状态
export const updateCommentStatus = (data) => {
    return AxiosPut(`/information/manager/comment/status`,data)
}