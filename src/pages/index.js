import React, { PureComponent } from 'react'
import { Redirect } from 'umi'
import { t } from "@lingui/macro"

class Index extends PureComponent {
  render() {
    console.log(11111111)
    return <Redirect to={t`/dashboard`} />
  }
}

export default Index
