import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page1 from './views/nav2/Page1.vue'
import Page2 from './views/nav2/Page2.vue'
import Page3 from './views/nav2/Page3.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav2/Page6.vue'
import Page7 from './views/nav2/Page7.vue'
import Page8 from './views/nav2/Page8.vue'
import Page9 from './views/nav2/Page9.vue'
import Page10 from './views/nav2/Page10.vue'
import Page0 from './views/nav3/Page0.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '个人信息',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '教研科研',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page1', component: Page1, name: '科研项目' },
            { path: '/page2', component: Page2, name: '教改项目' },
            { path: '/page3', component: Page3, name: '发表论文' },
            { path: '/page4', component: Page4, name: '著作教材' },
            { path: '/page5', component: Page5, name: '成果及知识产权' },
            { path: '/page6', component: Page6, name: '教研成果' },
            { path: '/page7', component: Page7, name: '创新团队' },
            { path: '/page8', component: Page8, name: '教学团队' },
            { path: '/page9', component: Page9, name: '学术竞赛指导老师' },
            { path: '/page10', component: Page10, name: '优秀人才' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page0', component: Page0, name: '信息查询' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;