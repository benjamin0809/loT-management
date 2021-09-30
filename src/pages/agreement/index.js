import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Button, Row, Input, Form, Checkbox  } from 'antd'
import { GlobalFooter } from 'components'
import { GithubOutlined } from '@ant-design/icons'
import { t } from "@lingui/macro"
import { Trans } from "@lingui/macro" 
import config from 'utils/config'

import styles from './index.less'

const FormItem = Form.Item
 
class Agreement extends PureComponent {

  render() { 
    
    const handleOk = values => {
      const data = {
        "clientId":"1",
        "userName":"administrator",
        "passWord":"12345699",
        "roleCode":"ADMINISTRATOR"
      } 
    }
    let footerLinks = [
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/zuiidea/antd-admin',
        blankTarget: true,
      },
    ]
 

    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            <img alt="logo" src={config.logoPath} />
            <span>{config.siteName}</span>
          </div>
          <Form
            onFinish={handleOk}
            >
            <FormItem name="username" 
              rules={[{ required: true }]} hasFeedback>
                <Input
                  placeholder={t`Username`}
                />
            </FormItem>
            <FormItem name="password"
              rules={[{ required: true }]} hasFeedback>
                <Input
                  type="password"
                  placeholder={t`Password`}
                />
            </FormItem>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                },
              ]}
            >
              <Checkbox>
                {t`Read and Agree`} <a href="/agreement">{t`Agreement`}</a>
              </Checkbox>
            </Form.Item>
            <Row>
              <Button
                type="primary"
                htmlType="submit" 
              >
                <Trans>Sign in</Trans>
              </Button>
              <p>
                <span className="margin-right">
                  <Trans>Username</Trans>
                  ：guest
                </span>
                <span>
                  <Trans>Password</Trans>
                  ：guest
                </span>
              </p>
            </Row>
          </Form>
        </div>
        <div className={styles.footer}>
          <GlobalFooter links={footerLinks} copyright={config.copyright} />
        </div>
      </Fragment>
    )
  }
}

export default Agreement
