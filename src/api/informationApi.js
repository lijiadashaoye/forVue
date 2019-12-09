import {
    AxiosGet,
    AxiosDelete,
    AxiosPost,
    AxiosPut
} from '../sets/axiosMethods';

//文章列表
export const articleList = (data) => {
    return AxiosGet('/information/manager/news-article',data)
}

//新增文章
export const addArticle = (data)=> {
    return AxiosPost('/information/manager/news-article',data)
}

//修改文章
export const updataArticle = (data) => {
    return AxiosPut('/information/manager/news-article',data)
}

//删除文章
export const deleteArticle = (id) => {
    return AxiosDelete(`/information/manager/news-article/${id}`)
}