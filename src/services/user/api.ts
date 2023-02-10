// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 登录接口 POST /account/login */
export async function login(body: User.LoginReq) {
  return request<User.LoginRes>(`${API_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}
