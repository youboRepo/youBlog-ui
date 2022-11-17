// import router from '@/router'
// import store from '@/store'
// import { setToken } from '@/utils/auth'
// //import request from '@/utils/request'
// import qs from 'qs'

// router.beforeEach((to, from, next) => {
//   const token = to.query.token
//   if (token) {
//     store.commit('user/SET_TOKEN', token)
//     setToken(token)
//     delete to.query.token
//     const query = qs.stringify(to.query)
//     if (query) {
//       next(to.path + '?' + query)
//     }
//     else {
//       next(to.path)
//     }
//   } else {
//     next()
//   }
// })