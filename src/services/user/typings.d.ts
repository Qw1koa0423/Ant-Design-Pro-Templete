// @ts-ignore
/* eslint-disable */

declare namespace User {
  /** 登录请求类型 */
  interface LoginReq {
    username: string; // 用户名
    password: string; // 密码
  }
  /** 登录返回类型 */
  interface LoginRes {
    token: string; // token
  }
}
