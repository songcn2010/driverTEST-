export default {
  path: '/home',
  component: () => import('@/views/home'),

  children: [
    {
      path: 'test',
      component: () => import('@/components/home/test')
    },
    {
      path: 'home',
      component: () => import('@/components/home/home')
    },
    {
      path: '/home',
      redirect: '/home/home'
    }
  ]
}