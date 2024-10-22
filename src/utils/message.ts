/*
 * @Date: 2024-07-04 16:57:10
 * @LastEditors: zhumanyao
 * @LastEditTime: 2024-07-10 15:23:53
 * @FilePath: \mini-warehouse\lib\utils\message.ts
 */
declare const uni: any

let timer: any = null

export const useMessage = () => {
  const message = (title: string, icon: string, duration: number, callback: Function) => {
    uni.showToast({
      title,
      icon,
      duration,
      success: () => {
        callback && callback()
      }
    })
  }

  // 成功
  const success = (title: string, duration = 1500, callback = () => {}) => {
    message(title, 'success', duration, callback)
  }

  // 失败
  const error = (title: string, duration = 1500, callback = () => {}) => {
    message(title, 'error', duration, callback)
  }

  // 加载中
  const loading = (title = '加载中...') => {
    uni.showLoading({
      title
    })
  }

  // 加载消失
  const hideLoading = () => {
    uni.hideLoading()
  }

  return {
    success,
    error,
    loading,
    hideLoading
  }
}

export const msg = useMessage()
