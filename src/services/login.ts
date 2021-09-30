import request from '@/utils/request'
import { AxiosPromise, AxiosResponse } from 'axios'
export interface ISignUp {
  username: string
  password: string
  repeatPassword: string
  phone?: string
  email?: string
  registerType: 1 | 2 // 1: 手机验证码；2：邮箱验证码
  verifyCode: string
}
export interface IResetPassword {
  username: string
  newPassword: string
  confirmPassword: string
  validateCode: string
}
export interface ApiResponse<T> extends AxiosResponse<T> {
  code?: number
  msg?: string
} 

type Result = ApiResponse<any> | { success: boolean; code?: number; msg?: string}
/**
 * 获取手机验证码
 * @param mobile
 */
export async function fetchCaptcha(mobile: string, useType: number): Promise<Result> {
  return request({
    method: 'get',
    url: `/user/phone/sms/code`,
    data: {
      phone: mobile,
      useType,
      timestamp: Date.now(),
    },
  })
}

/**
 * 用户注册
 * @param dto
 * @returns
 */
export async function signUp(dto: ISignUp): Promise<Result> {
  return request({
    method: 'post',
    url: `/register/user`,
    data: dto,
  })
}

/**
 * 重置密码
 * @param data
 * @returns
 */
export async function resetPassword(data: IResetPassword): Promise<Result> {
  return request({
    method: 'put',
    url: `/user/reset/password`,
    data,
  })
}

