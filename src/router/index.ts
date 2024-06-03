import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages' // Use the correct alias

const router = createRouter({
  history: createWebHistory(),
  routes,
})
console.log(router)
export default router
