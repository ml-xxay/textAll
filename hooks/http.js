// import config from '@/config'
// import { sysStore } from './store'


const gotoLogin = () => {
  sysStore().user.token = '';
  uni.redirectTo({
    url: config.loginUrl || '/view/login/login'
  });
};

// const request = (
//   url: string,
//   body: any,
//   method: string,
//   params: any,
//   reqOptions?: any,
//   hasLoading?: any
// ) => {
//   return new Promise((resolve, reject) => {
//     return uni.request({
//       url: `${config.baseUrl}/${url}`,
//       data: body,
//       method,
//       params,
//       header: {
//         Xdaptoken: sysStore()?.user?.token,
//         Xdapappid: config.dfConf.appId,
//         Xdaptenantid: config.dfConf.tenantId,
//         Xdaptimestamp: new Date().getTime(),
//         Xdaptimezone: '+08:00',
//         token: sysStore()?.user?.token,
//         openId: sysStore()?.user?.openId
//       },
//       ...reqOptions,
//       success: (res: any = {}) => {
//         // const { code, msg } = res.data || {}
//         // switch (code) {
//         //   case 0:
//         //     uni.showToast({ title: msg, icon: 'none' })
//         //     // utils.showToast({ title: msg,icon:"remind" });
//         //     return reject(res)
//         //   case 2:
//         //     gotoLogin()
//         //     uni.showToast({ title: msg, icon: 'none' })
//         //     return reject(res)
//         //   case 1:
//         //   default:
//         //     return resolve(res)
//         // }

//         const { statusCode } = res || {}
//         switch (statusCode) {
//           case 401:
//             uni.showToast({ title: '请先登录' })
//             gotoLogin()
//             break
//           case 403:
//             uni.showToast({ title: '登录过期请重新登录' })
//             gotoLogin()
//             break
//           default:
//             return resolve(res)
//         }
//       },
//       fail: (error: { message: ''; response: { status: any } }) => {
//         // 判断请求异常信息中是否含有超时timeout字符串
//         const { message = '', response = { status: '' } } = error || {}
//         if (message.includes('timeout')) {
//           uni.showToast({ title: '网络超时，请稍后再试' })
//         } else if (message.includes('Network Error')) {
//           uni.showToast({ title: '网络异常' })
//         }
//         if (response.status) {
//           switch (response.status) {
//             // 401: 未登录
//             case 401:
//               uni.showToast({ title: '请先登录' })
//               gotoLogin()
//               break
//             // 403 token过期
//             case 403:
//               // 登录过期对用户进行提示
//               gotoLogin()
//               uni.showToast({ title: '登录过期请重新登录' })

//               break
//             // 404请求不存在
//             case 404:
//               // 处理逻辑
//               uni.showToast({ title: '数据接口接口404报错。' })
//               break
//             case 500:
//               // 处理逻辑
//               uni.showToast({
//                 title: '服务器发生了错误，请稍后再试！',
//                 icon: 'none'
//               })
//               break
//           }
//         }
//         reject(error)
//       }
//     })
//   })
// }

// const useHttp = () => {
//   const get = (url: string, data: any, params?: any): Promise<any> =>
//     new Promise((resolve, reject) => {
//       request(url, data, 'GET', params).then(
//         (res: any) => {
//           resolve(res.data)
//         },
//         (err) => {
//           reject(err)
//         }
//       )
//     })
//   const post = (url: string, data: any, params?: any, hasLoading?: any): Promise<any> =>
//     new Promise((resolve, reject) => {
//       request(
//         url,
//         data,
//         'POST',
//         params,
//         {
//           dataType: 'json',
//           headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//         },
//         hasLoading
//       ).then(
//         (res: any) => {
//           resolve(res.data)
//         },
//         (err) => {
//           reject(err.data)
//         }
//       )
//     })
//   return {
//     get,
//     post,
//     request
//   }
// }



//自己测试
const request = () => {
  return new Promise((resolve, reject) => {
    // resolve('我是测试成功');
    reject('失败')
  });
};

const useHttp = () => {
  const get = () => {
   return new Promise((resolve, reject) => {
      request().then((res,err) => {
        // resolve(res);
        reject(err)
      });
    });
  };

  return {
    get
  };
};


export let http = useHttp();
