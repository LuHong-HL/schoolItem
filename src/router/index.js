import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import Home from '@/pages/home/Home'
import Announcement from '@/pages/announcement/Announcement'
// import StudentLeave from '@/pages/studentLeave/StudentLeave'
// import PlaceQuery from '@/pages/place/view/PlaceQuery'
// import PlaceApply from '@/pages/place/view/PlaceApply'

// import PlaceAddSchool from '@/pages/place/view/PlaceAddSchool'
// import PlaceAddArea from '@/pages/place/view/PlaceAddArea'
// import PlaceAddField from '@/pages/place/view/PlaceAddField'

// import PlaceSchool from '@/pages/place/view/PlaceSchool'
// import PlaceArea from '@/pages/place/view/PlaceArea'
// import PlaceField from '@/pages/place/view/PlaceField'
// // import Test from '@/pages/place/view/Test'
// import PlaceUpdateSchool from '@/pages/place/view/PlaceUpdateSchool'
// import PlaceUpdateArea from '@/pages/place/view/PlaceUpdateArea'
// import PlaceUpdateField from '@/pages/place/view/PlaceUpdateField'
// import PlaceCreateDepartment from '@/pages/place/view/PlaceCreateDepartment'
// import PlaceCreateUser from '@/pages/place/view/PlaceCreateUser'

// 导入组件路径
import Activity from '@/pages/views/activity/Activity'
import Comment from '@/pages/views/comment/Comment'
import Organization from '@/pages/views/organization/Organization'
import User from '@/pages/views/user/User'
import Test from '@/pages/views/common/Test'
import UserAdd from '../pages/views/user/components/UserAdd'
import ActivityCommets from '../pages/views/comment/components/ActivityComments.vue'
import ChangePassword from '../pages/views/organization/components/ChangePassword.vue'
import ModifyInformation from '../pages/views/organization/components/ModifyInformation.vue'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login,
    meta:{
      title:"社团、机构后台管理"
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      // home下的子路由
      {
        path: 'activity',
        name: 'activity',
        component: Activity,
        meta: {
          title: '活动管理'
        }
      },
      {
        path: 'comment',
        name: 'comment',
        component: Comment,
        meta:{
          title:"评论管理"
        }
      },
      {
        path: 'organization',
        name: 'organization',
        component: Organization,
        meta:{
          title:"社团、机构管理"
        }
      },
      {
        path: 'user',
        name: 'user',
        component: User,
        meta:{
          title:"人员管理"
        }
      },
      {
        path: 'announcement',
        name: 'Announcement',
        component: Announcement,
        meta:{
          title:"公告页"
        }
      },
      {
        path: 'test',
        name: 'test',
        component: Test,
        meta:{
          title:"测试"
        }
      },
      {
        path: 'userAdd',
        name: 'userAdd',
        component: UserAdd,
        meta:{
          title:"添加人员"
        }
      },
      {
        path: 'activityComments',
        name: 'activityComments',
        component: ActivityCommets,
        meta:{
          title:"活动评论管理"
        }
      }, {
        path: 'changePassword',
        name: 'changePassword',
        component: ChangePassword
      },
      {
        path: 'modifyInformation',
        name: 'modifyInformation',
        component: ModifyInformation
      }
      // {
      // 	path: 'studentLeave',
      // 	name: 'StudentLeave',
      // 	component: StudentLeave
      // },
      // 	{
      // 		path: 'place/view/PlaceQuery',
      // 		name: 'PlaceQuery',
      // 		component: PlaceQuery
      // 	},
      // 	{
      // 		path: 'place/view/PlaceApply',
      // 		name: 'PlaceApply',
      // 		component: PlaceApply
      // 	},
      // 	{
      // 		path: 'place/view/PlaceAddSchool',
      // 		name: 'placeAddSchool',
      // 		component: PlaceAddSchool,
      // 	},
      // 	{
      // 		path: 'place/view/PlaceAddArea',
      // 		name: 'placeAddArea',
      // 		component: PlaceAddArea,
      // 	},
      // 	{
      // 		path: 'place/view/PlaceAddField',
      // 		name: 'placeAddField',
      // 		component: PlaceAddField,
      // 	},

      // 	{
      // 		path: 'place/view/PlaceSchool',
      // 		name: 'PlaceSchool',
      // 		component: PlaceSchool,
      // 	},
      // 	{
      // 		path: 'place/view/PlaceArea',
      // 		name: 'PlaceArea',
      // 		component: PlaceArea,
      // 	},
      // 	{
      // 		path: 'place/view/PlaceField',
      // 		name: 'PlaceField',
      // 		component: PlaceField,
      // 	},
      // 	// {
      // 	// 	path: 'place/view/Test',
      // 	// 	name: 'test',
      // 	// 	component: Test,
      // 	// },
      // 	{
      // 		path: 'place/view/PlaceUpdateSchool',
      // 		name: 'placeUpdateSchool',
      // 		component: PlaceUpdateSchool,
      // 	},
      // 	{
      // 		path: 'place/view/PlaceUpdateArea',
      // 		name: 'placeUpdateArea',
      // 		component: PlaceUpdateArea,
      // 	},
      // 	{
      // 		path: 'place/view/PlaceUpdateField',
      // 		name: 'placeUpdateField',
      // 		component: PlaceUpdateField,
      // 	},
      // 	{
      // 		path: 'place/view/PlaceCreateDepartment',
      // 		name: 'placeCreateDepartment',
      // 		component: PlaceCreateDepartment,
      // 	},
      // 	{
      // 		path: 'place/view/PlaceCreateUser',
      // 		name: 'placeCreateUser',
      // 		component: PlaceCreateUser,
      // 	},

      //home 下的子路由
      // {
      // 	path: 'test',
      // 	name: 'test',
      // 	component: Test,
      // },
    ]
  }
  ]
})

// // 路由拦截
// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//     if (to.meta.title) {
//       document.title = to.meta.title
//     }
//     // 读取sessionStorage中的数据
//     let user = JSON.parse(sessionStorage.getItem('myUser') || '[]')
//     // 判断是否登录 是 继续进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
//     if (user.username && user.password) {
//       next()
//     } else {//返回上一层
//       // 如果是注销 跳转到登录页面 先清除sessionStorage中的数据再跳转
//       if (to.fullPath == "/") {
//         sessionStorage.clear();
//         next();
//       } else {
//         // 如果没有登录 则中断当前路由 跳转到新路由（登录页面）
//         next({ path: '/' })
//       }
//     }//if else 结束

//   })

export default router