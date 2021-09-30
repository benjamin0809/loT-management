import React, { useState, useEffect, Fragment } from 'react'
import { Link, useRequest, history, useDispatch, getDvaApp } from 'umi'
import { t } from '@lingui/macro'
import { GlobalFooter } from '@/components'
import GlobalHeader from '@/components/GlobalHeader'
import styles from './style.less'
import { Link as LinkProps } from '@/interfaces/Common'
import { setLocale } from '@/utils'
import config from '@/utils/config'
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  message
} from 'antd'
import {
  fetchCaptcha,
  resetPassword,
  IResetPassword,
} from '@/services/login'

let headerLinks: LinkProps[] = []
if (config.i18n) {
  headerLinks = headerLinks.concat(
    config.i18n.languages.map((item: any) => ({
      key: item.key,
      title: <span onClick={setLocale.bind(null, item.key)}>{item.title}</span>,
    }))
  )
}

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number>(0)
  const [captchastr, setCaptchastr] = useState<string>('Get captcha')
  const [mobile, setMobile] = useState<string>('')
  const [form] = Form.useForm()

  /**
   * 倒计时副作用
   */
  useEffect(() => {
    if (countdown > 0) {
      setCaptchastr(`${countdown} 秒后再试`)
      const f = () => {
        setTimeout(() => {
          if (countdown > 0) {
            setCountdown(countdown - 1)
          }
        }, 1000)
      }
      f()
    } else {
      setCaptchastr('Get captcha')
    }
  }, [countdown])

  /**
   * 获取验证码
   */
  const getCaptcha = async () => {
    const value = form.getFieldValue('f_mobile')
    const data = await fetchCaptcha(value, 1)
    if (data.code === 0) {
      setCountdown(60)
    } else {
      message.error(`获取验证码失败,错误原因:${data.msg}`)
    }
  }

  /**
   * 表单校验：校验密码，暂定只校验密码长度8-20位
   * @param _
   * @param value 密码输入框的值
   * @returns
   */
  const checkPassword = (_: any, value: string) => {
    const promise = Promise
    if (value && value.length < 8) {
      return promise.reject('密码长度最小为8个字符!')
    }
    if (value && value.length > 20) {
      return promise.reject('密码长度最大为20个字符!')
    }
    return promise.resolve()
  }

  /**
   * 表单校验：二次密码确认
   * @param _
   * @param value 密码确认输入框的值
   * @returns
   */
  const checkConfirm = (_: any, value: string) => {
    const promise = Promise
    if (value && value !== form.getFieldValue('f_password')) {
      return promise.reject('两次输入的密码不匹配!')
    }
    return promise.resolve()
  }
  /**
   * 表单校验：验证码6位数字
   * @param _
   * @param value 验证码输入框的值
   * @returns
   */
  const checkCaptcha = (_: any, value: string) => {
    const promise = Promise
    if (value && !/^(\d{6})$/.test(value)) {
      return promise.reject('请输入6位数字验证码')
    }
    return promise.resolve()
  }

  /**
   * 表单手机号码输入，够11位才可以点击获取验证码
   */
  const onMobileChange = () => {
    const value = form.getFieldValue('f_mobile')
    setMobile(value || '')
  }

  /**
   * 提交表单
   * @param e
   */
  const onFinish = async (e: any) => {
    // console.log(e)
    // {f_username: 'benjamin', f_password: '12345699', f_password2: '12345699', f_mobile: '15014491899', f_captcha: '123456'}
    const data: IResetPassword = {
      username: e.f_username,
      newPassword: e.f_password,
      confirmPassword: e.f_password,
      validateCode: e.f_captcha,
    }
    setLoading(true)
    try {
      await resetPassword(data)
      setLoading(false)
      message.success('重置密码成功')
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <Fragment>
      <GlobalHeader links={headerLinks} />
      <div className={styles.main}>
        <div className={styles.form}>
          <h1 className={styles.title}>{t`Reset_Password_Label`}</h1>
          <Form
            form={form}
            name="reset_pwd"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label={t`UserName_Label`}
              name="f_username"
              hasFeedback
              rules={[{ required: true, message: t`UserName` }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t`New_Password_Label`}
              name="f_password"
              hasFeedback
              extra={t`Password_Regular`}
              rules={[
                { required: true, message: t`Password Hints` },
                {
                  validator: checkPassword,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={t`Password_Review_Label`}
              name="f_password2"
              hasFeedback
              rules={[
                { required: true, message: t`Password Hints Review` },
                {
                  validator: checkConfirm,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={t`Mobile_Label`}
              name="f_mobile"
              hasFeedback
              rules={[
                { required: true, message: t`Mobile Hints` },
                {
                  pattern: /^\d{11}$/,
                  message: t`Mobile Illegal`,
                },
              ]}
            >
              <Input onChange={onMobileChange} />
            </Form.Item>
            <Form.Item label={t`Verify_Code_Label`} required={true}>
              <Row gutter={8}>
                <Col flex="1">
                  <Form.Item
                    name="f_captcha"
                    hasFeedback
                    rules={[
                      { required: true, message: t`Verify Code Required` },
                      { validator: checkCaptcha },
                    ]}
                  >
                    <Input placeholder="请输入6位数字验证码" />
                  </Form.Item>
                </Col>
                <Col flex="100px">
                  <Button
                    disabled={countdown > 0 || mobile.length < 11}
                    onClick={getCaptcha}
                  >
                    {captchastr}
                  </Button>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
              <Row gutter={8} align="middle" justify="space-between">
                <Col span={6} className={styles.loginRoute}>
                  <Link to="/login">返回登录</Link>
                </Col>
                <Col flex="160px">
                  <Button
                    type="primary"
                    block
                    htmlType="submit"
                    loading={loading}
                  >
                    重置
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className={styles.footer}>
        <GlobalFooter copyright={config.copyright} slogon={config.slogon} />
      </div>
    </Fragment>
  )
}
export default ResetPassword
