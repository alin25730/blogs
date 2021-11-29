import axios from "axios";
import { Loading,Message  } from 'element-ui';
import router from './common/router'
let loading;
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: "拼命加载中",
        body:true,
        background:'rgba(0,0,0,0.7)'
    });
}
function endLoading() {
    loading.close();
}
// 请求拦截
axios.interceptors.request.use(config => {
  
    startLoading();
    // 携带请求头
    const token = localStorage.getItem('blogToken');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
}, err => {
    console.log(err)
})

// 响应拦截
axios.interceptors.response.use(config => {
  
    endLoading()
    return config;
}, err => {
    const { status } = err.response;
    if (status == 401) {
        endLoading()
        Message.error('token失效,请重新登陆');
        console.log('token失效,请重新登陆')
        localStorage.removeItem('blogToken');
        // 跳转到登陆页面
        router.push("/Login");
    }else if(err.response.status == 400) {
        endLoading()
        return err;
        
    }
    Message.error(err.response.data);
    return Promise.reject(err);
   
})

export default axios;