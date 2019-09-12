export default {
  path: '/center',
  component: () => import('@/views/center'),

  children: [
    {
      path: 'center',
      name: "个人中心",
      component: () => import('@/components/center/center')
    },
    {
      path: 'login',
      name: "登　　录",
      component: () => import('@/components/center/login')
    },
    {
      path: 'nickname',
      name: "修改昵称",
      component: () => import('@/components/center/nickname')
    },
    {
      path: 'repass',
      name: "修改密码",
      component: () => import('@/components/center/repass')
    },
    {
      path: 'register',
      name: "注　　册",
      component: () => import('@/components/center/register')
    },
    {
      path: '/center',
      redirect: '/center/center'
    }
  ]
}