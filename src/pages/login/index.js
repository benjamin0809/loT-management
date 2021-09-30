import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect, Link } from 'umi'
import { Button, Row, Input, Form, Checkbox, Col } from 'antd'
import { GlobalFooter } from 'components'
import GlobalHeader from '@/components/GlobalHeader'
import { GithubOutlined } from '@ant-design/icons'
import { t } from '@lingui/macro'
import { Trans } from '@lingui/macro'
import { setLocale } from 'utils'
import config from 'utils/config'

import styles from './index.less'

const FormItem = Form.Item

@connect(({ loading, dispatch }) => ({ loading, dispatch }))
class Login extends PureComponent {
  render() {
    const { dispatch, loading } = this.props

    const handleOk = (values) => {
      console.log(values)
      // const data = {
      //   clientId: '1',
      //   username: 'administrator',
      //   password: '12345699',
      //   roleCode: 'ADMINISTRATOR',
      // }
      dispatch({ type: 'login/login', payload: values })
    }
    let headerLinks = []

    if (config.i18n) {
      headerLinks = headerLinks.concat(
        config.i18n.languages.map((item) => ({
          key: item.key,
          title: (
            <span onClick={setLocale.bind(null, item.key)}>{item.title}</span>
          ),
        }))
      )
    }

    return (
      <Fragment>
        <GlobalHeader links={headerLinks}/>
        <div className={styles.container}>
          <div className={styles.bg}></div>
          <div className={styles.form}>
            <div className={styles.logo}>
              <img alt="logo" src={config.logoPath} />
              {/* <span>{config.siteName}</span> */}
            </div>
            <Form onFinish={handleOk}>
              <FormItem
                name="username"
                rules={[{ required: true }]}
                hasFeedback
              >
                <Input placeholder={t`Username`} />
              </FormItem>
              <FormItem
                name="password"
                rules={[{ required: true }]}
                hasFeedback
              >
                <Input type="password" placeholder={t`Password`} />
              </FormItem>
              <Form.Item
                name="agreement"
                valuePropName="checked"
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
                  {t`Read and Agree`} <Link to="/agreement">{t`Agreement`}</Link> 
                </Checkbox>
              </Form.Item>
              <Row>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading.effects.login}
                >
                  <Trans>Sign in</Trans>
                </Button>
              </Row>
              <Row justify="space-between" className={styles.buttons}>
                <Col span={12}>
                  <Link to="/signup">{t`Sign Up`}</Link> 
                </Col>
                <Col span={12} className={styles.right}>
                  <Link to="/resetpwd">{t`Forgot password`}</Link> 
                </Col>
              </Row>
            </Form>
          </div>
        </div>

        <div className={styles.footer}>
          <GlobalFooter copyright={config.copyright} slogon={config.slogon} />
        </div>
      </Fragment>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Login
