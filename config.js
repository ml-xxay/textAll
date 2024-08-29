import DEV_CONF from './env.development'
import PROD_CONF from './env.production'

const envConf = process.env.NODE_ENV === 'development' ? DEV_CONF : PROD_CONF

const conf = {
  ...envConf,
  // loginUrl: '/pages/login', // 登录界面地址（ http 拦截去跳转的地址 )
  loginUrl: '/view/login/login' // 登录界面地址（ http 拦截去跳转的地址 )
}

export default conf
