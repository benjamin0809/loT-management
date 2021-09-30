import React, { useState, useEffect, Fragment } from 'react'
import { Link, useRequest, history, useDispatch, getDvaApp } from 'umi'
import { t } from '@lingui/macro'
import { GlobalFooter } from '@/components'
import GlobalHeader from '@/components/GlobalHeader'
import styles from './index.less'
import { HeaderProps, Link as LinkProps } from '@/interfaces/Common'
import { isEmail, setLocale } from '@/utils'
import config from '@/utils/config'
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Popover,
  Progress,
  message,
} from 'antd'
import { fetchCaptcha, ISignUp, signUp } from '@/services/login'

const FormItem = Form.Item
const { Option } = Select
const { Group } = Input

let headerLinks: LinkProps[] = []
if (config.i18n) {
  headerLinks = headerLinks.concat(
    config.i18n.languages.map((item: any) => ({
      key: item.key,
      title: <span onClick={setLocale.bind(null, item.key)}>{item.title}</span>,
    }))
  )
}

const MenuManagement: React.FC = () => {
  const dispatch = useDispatch()
  const [countdown, setCountdown] = useState<number>(0)
  const [captchastr, setCaptchastr] = useState<string>('Get captcha')
  const [mobile, setMobile] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)
  const [prefix, setPrefix] = useState<string>('86')
  const [popover, setPopover] = useState<boolean>(false)
  const confirmDirty = false
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
    const value = form.getFieldValue('r_mobile')
    const data = await fetchCaptcha(value, 1)
    if (data.code === 0) {
      setCountdown(60)
    } else {
      message.error(`获取验证码失败,错误原因:${data.msg}`)
    }
  }
  const checkCaptcha = (_: any, value: string) => {
    const promise = Promise
    if (value && !/^(\d{6})$/.test(value)) {
      return promise.reject('请输入6位数字验证码')
    }
    return promise.resolve()
  }

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise
    if (value && value !== form.getFieldValue('r_password')) {
      return promise.reject('两次输入的密码不匹配!')
    }
    return promise.resolve()
  }

  const checkEmail = (_: any, value: string) => {
    const promise = Promise
    if (value && !isEmail(value)) {
      return promise.reject('邮箱格式不正确!')
    }
    return promise.resolve()
  }

  const onFinish = async (e: any) => {
    console.log(e)
    const data: ISignUp = {
      username: e.r_username,
      password: e.r_password,
      phone: e.r_mobile,
      email: e.r_email,
      repeatPassword: e.r_password2,
      registerType: 1,
      verifyCode: e.r_captcha,
    }
    const res = await signUp(data)
    if(res.code === 0) {
      message.success('注册成功')
    }else{
      message.error('注册失败，' + res.msg)
    }
    
    console.log(res)
  }
  const onMobileChange = () => {
    const value = form.getFieldValue('r_mobile')
    setMobile(value || '')
  }
  const userName = () => t`UserName`
  const checkUserName = (_: any, value: string) => {
    const promise = Promise
    if (!value) {
      return promise.reject(userName)
    }
    return promise.resolve()
  }
  return (
    <Fragment>
      <GlobalHeader links={headerLinks} />
      <div className={styles.main}>
        <div className={styles.form}>
          <h1 className={styles.title}>{t`Sign Up Hints`}</h1>
          <Form
            form={form}
            name="signup"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label={t`UserName_Label`}
              name="r_username"
              rules={[
                { validator: checkUserName },
                // {
                //   pattern: /^\d{11}$/,
                //   message: t`Mobile Illegal`,
                // },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t`Mobile_Label`}
              name="r_mobile"
              validateTrigger="onBlur"
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
                    name="r_captcha"
                    noStyle
                    rules={[
                      { required: true, message: t`Verify Code Required` },
                      {
                        validator: checkCaptcha,
                      },
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
            <Form.Item
              label={t`Password_Label`}
              name="r_password"
              extra={t`Password_Regular`}
              rules={[{ required: true, message: t`Password Hints` }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={t`Password_Review_Label`}
              name="r_password2"
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
              label={t`Email_Label`}
              name="r_email"
              rules={[
                {
                  validator: checkEmail,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 6, span: 16 }}
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error('Should accept agreement')),
                },
              ]}
            >
              <Checkbox>
                {t`Read and Agree`} <Link to="/agreement">{t`Agreement`}</Link>{' '}
              </Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
              <Row gutter={8} align="middle" justify="space-between">
                <Col flex="1">
                  <Button type="primary" block htmlType="submit">
                    注册
                  </Button>
                </Col>
                <Col flex="120px">
                  <Link to="/login">使用已有账号登录</Link>
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
export default MenuManagement
