import router from '@/router'
import store from '@/store'
import WebStorageCache from 'web-storage-cache'
import axios from 'axios'
import { parseTime } from '@/utils/index'

const wsCache = new WebStorageCache()

router.beforeEach((to, from, next) => {
  const jobNumber = store.getters.jobNumber
  const path = to.fullPath
  if (jobNumber && path && !wsCache.get('monitor')) {
    axios.post('http://202.105.146.234:8888/monitor/operation/api/create', {
      jobNumber: jobNumber,
      operationAction: path,
      operationTime: parseTime(new Date())
    })
    wsCache.set('monitor', 1, { exp: 300 })
  }

  next()
})