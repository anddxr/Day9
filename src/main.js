import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import Students from './components/Students.vue'
import StudentInfo from './components/StudentInfo.vue'

const routes = [
{ path: '/', component: Students},
{ path: '/students/:id', component: StudentInfo}
]

const router = new VueRouter({
    routes
 })
 
Vue.use(VueRouter)
new Vue({
   render: h => h(Students),
   el: '#app',
},
{
    render: h => h(App),
   el: '#app',
   router
})
