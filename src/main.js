// vue-router ≥3.0版本回调形式以及改成promise api的形式了，
// 返回的是一个promise，如果没有捕获到错误，控制台始终会出现如图的警告，针对于路由跳转相同的地址，目前的解决方案
// import Router from 'vue-router'
 
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 发起请求后，如果没有登录 跳转到登录页面
// axios.interceptors.response.use(
//   res => {
//     if(res.data.code == 3){
//       router.push(url)
//     }
//     return res;
//   }
// );

import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
// import PlaceGlobal from './pages/place/components/PlaceGlobal.js'

import {
	Menu,
	Icon,
	Badge,
	message,
	Pagination,
	autoComplete,
	input,
	button,
	table,
	cascader,
	popconfirm,
	modal,
	drawer,
	form,
	select,
	radio,
	upload,
	datePicker,

	list,
	card,
	avatar,
	row,
	col,
	comment,
	tooltip,
	dropdown,
	inputNumber,
	timePicker,

} from 'ant-design-vue'
import "./assets/styles/css/reset.css"
// import "./assets/styles/css/iconfont.css"
import "./assets/font/iconfont.css"
import './assets/styles/css/content.css'


Vue.use(Menu);
Vue.use(Icon);
Vue.use(Badge);
Vue.use(message);
Vue.use(Pagination);
Vue.use(autoComplete);
Vue.use(input);
Vue.use(button);
Vue.use(table);
Vue.use(cascader);
Vue.use(popconfirm);
Vue.use(modal);
Vue.use(drawer);
Vue.use(form);
Vue.use(select);
Vue.use(radio); 
Vue.use(upload);
Vue.use(datePicker);
Vue.use(list);
Vue.use(card);
Vue.use(avatar);
Vue.use(row)
Vue.use(col)
Vue.use(comment)
Vue.use(tooltip)
Vue.use(dropdown)
Vue.use(inputNumber)
Vue.use(timePicker)

Vue.prototype.$message = message
Vue.config.productionTip = false
axios.defaults.withCredentials = true //解决sessionId不一致问题：跨域共享session
Vue.prototype.$qs = qs //qs.stringify()将对象 序列化成URL的形式，以&进行拼接
Vue.use(VueAxios, axios) //axios结合vue-axios使用
// Vue.prototype.placeGlobal=PlaceGlobal
// 设置默认baseURL
// const baseURL=axios.defaults.baseURL = 'http://119.23.34.254:8866/'
const baseURL=axios.defaults.baseURL = 'http://10.20.5.49:8866/'
// const baseURL=axios.defaults.baseURL = 'http://172.18.44.109:8080/'
// const baseURL=axios.defaults.baseURL = 'http://localhost:8866/'

// 定义全局属性
Vue.prototype.$baseURL=baseURL


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
