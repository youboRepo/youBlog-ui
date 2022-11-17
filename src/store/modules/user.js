import { login, logout, getInfo } from '@/api/user/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { toggleClass } from '@/utils'
import settings from '@/settings'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    username: '',
    avatar: '',
    introduction: '',
    roles: [],
    userId: undefined,
    jobNumber: '',
    departmentId: undefined,
    departmentType: undefined,
    subDepartmentId: undefined,
    subDepartmentType: undefined,
    rootDepartmentId: undefined,
    rootDepartmentType: undefined,
    isAdmin: false,
    isSwitchUser: false,
    userType: undefined,
    fileServerUrl: 'http://183.62.143.166:55678'
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId
  },
  SET_JOB_NUMBER: (state, jobNumber) => {
    state.jobNumber = jobNumber
  },
  SET_DEPARTMENT_ID: (state, departmentId) => {
    state.departmentId = departmentId
  },
  SET_DEPARTMENT_TYPE: (state, departmentType) => {
    state.departmentType = departmentType
  },
  SET_SUB_DEPARTMENT_ID: (state, subDepartmentId) => {
    state.subDepartmentId = subDepartmentId
  },
  SET_SUB_DEPARTMENT_TYPE: (state, subDepartmentType) => {
    state.subDepartmentType = subDepartmentType
  },
  SET_ROOT_DEPARTMENT_ID: (state, rootDepartmentId) => {
    state.rootDepartmentId = rootDepartmentId
  },
  SET_ROOT_DEPARTMENT_TYPE: (state, rootDepartmentType) => {
    state.rootDepartmentType = rootDepartmentType
  },
  SET_IS_ADMIN: (state, isAdmin) => {
    state.isAdmin = isAdmin
  },
  SET_IS_SWITCH_USER: (state, isSwitchUser) => {
    state.isSwitchUser = isSwitchUser
  },
  SET_USER_TYPE: (state, userType) => {
    state.userType = userType
  },
  SET_FILE_SERVER_URL: (state, fileServerUrl) => {
    state.fileServerUrl = fileServerUrl
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, kaptcha } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, kaptcha: kaptcha.trim() }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, username, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_USERNAME', username)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)

        commit('SET_USER_ID', data.userId)
        commit('SET_JOB_NUMBER', data.jobNumber)
        commit('SET_DEPARTMENT_ID', data.departmentId)
        commit('SET_DEPARTMENT_TYPE', data.departmentType)
        commit('SET_SUB_DEPARTMENT_ID', data.subDepartmentId)
        commit('SET_SUB_DEPARTMENT_TYPE', data.subDepartmentType)
        commit('SET_ROOT_DEPARTMENT_ID', data.rootDepartmentId)
        commit('SET_ROOT_DEPARTMENT_TYPE', data.rootDepartmentType)
        commit('SET_IS_ADMIN', data.isAdmin)
        commit('SET_IS_SWITCH_USER', data.isSwitchUser)
        commit('SET_USER_TYPE', data.userType)
        commit('SET_FILE_SERVER_URL', data.fileServerUrl)
        if (data.theme) {
          toggleClass(document.body, data.theme + '-theme')
          const value = settings.theme[data.theme]
          if (value) {
            commit('settings/CHANGE_SETTING', { key: 'theme', value }, { root: true })
          }
        }

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(({ data }) => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
