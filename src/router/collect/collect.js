export default {
  path: "/collect",
  component: () => import('@/views/collect'),

  children: [
    {
      path: 'colList',
      component: () => import('@/components/collect/colList')
    },
    {
      path: 'colTest',
      component: () => import('@/components/collect/colTest')
    },
    {
      path: '/collect',
      redirect: '/collect/colList'
    }
  ]
}