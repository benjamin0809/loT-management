import { history } from 'umi'
const { pathToRegexp } = require("path-to-regexp")
import api from 'api'
const { sendSMSverifyCode } = api

export default {
  namespace: 'signup',

  state: {
    isSent: false
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     history.listen(location => {
  //       if (pathToRegexp('/login').exec(location.pathname)) {
  //       }
  //     })
  //   },
  // },
  reducers: {
    update(state, { payload: data }) {
      console.log('update ,', data)
      return {...state, ...data}
    }
  },
  effects: {
    *signUp({ payload }, { put, call, select }) { 
      const data = yield call(sendSMSverifyCode, payload)
      console.log(data)
      const { locationQuery } = yield select(_ => _.app)
      if (data.success) {
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (!pathToRegexp('/login').exec(from)) {
          if (['', '/'].includes(from)) history.push('/dashboard')
          else history.push(from)
        } else {
          history.push('/dashboard')
        }
      } else {
        throw data
      }
    },
    *getCaptcha({ payload }, { put, call, select }) { 
      const data = yield call(sendSMSverifyCode, payload)
      console.log(data)
      if(data.code === 0) {
        yield put({ type: 'update',payload: {
            isSent : false
          } 
        })
      }
      return data
    },
  },
}
