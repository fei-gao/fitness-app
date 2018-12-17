import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddWorkout from '@/components/AddWorkout'
import EditWorkout from '@/components/EditWorkout'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-workout',
      name: 'AddWorkout',
      component: AddWorkout
    },
    {
      path:'edit/:category',
      name:'EditWorkout',
      component: EditWorkout
    }
  ]
})
