import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/",
            redirect: '/Home'
        },
        {
            path: "/Home",
            component: () => import('../views/Home')
        },
        {
            path: "*",
            name: 'BlogFourpage',
            component: () => import('../views/fourPage'),
        },
        {
            path: "/essay",
            component: () => import('../views/essay'),
        },
        {
            path: "/About",
            component: () => import('../views/About'),
        },
        {
            path: "/blogroll",
            component: () => import('../views/blogroll'),
        },
        {
            path: "/Login",
            component: () => import('../views/BackStage/Login'),
        },
        {
            path: "/register",
            component: () => import('../views/BackStage/register'),
        },
        {
            path: "/Adminpage",
            component: () => import('../views/management/AdminPage'),
            beforeEnter(to, from, next) {
                const token = localStorage.getItem('blogToken');
                if (to.path == "/register" || to.path == "/Login" || to.path == "/blogroll" || to.path == "/About" || to.path == "/essay" || to.path == "/essay" || to.path == "/Home") {
                    next()

                } else {
                    if (token) {
                        next()
                    } else {
                        next('/Login')
                    }
                }

                next()
            },
            children: [
                {
                    path: "",
                    component: () => import('../views/management/AdminMe'),
                },
                // 首页
                {
                    path: "/Adminme",
                    component: () => import('../views/management/AdminMe'),
                },
                // 留言
                { 
                    path: "/Leave",
                    component: () => import('../components/leave'),
                },
                // 编辑留言
                {
                    path: "/EditMessage",
                    component: () => import('../components/answer'),
                },
                // 添加友情
                {
                    path: "/AddFtriend",
                    component: () => import('../views/BackStage/friend'),
                },
                // vue-meditor
                {
                    path: "/Meditor",
                    component: () => import('../views/BackStage/Meditor'),
                },
                // 编辑文章
                {
                    path: "/EditMeditor",
                    component: () => import('../views/BackStage/EditMeditor'),
                },
               

            ]
        },

    ]
});

export default router;