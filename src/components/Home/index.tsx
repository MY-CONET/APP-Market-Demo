import React, { useState, useEffect } from 'react'
import { Button } from 'antd';
import logo from '../../logo.svg';

import { callback } from '../../PlatformAPI/call';

const Start: React.FC = () => {


  function receiveMessageFromIndex(params: any) {
    if (params.data?.type === 'loginUserChange') {
      setLoginUserName(params.data?.data?.name);
    }
  }

  window.addEventListener('message', receiveMessageFromIndex, false);

  const [loginUserName, setLoginUserName] = React.useState<string>('');

  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          APP 2
        </p>
        <h1>{`当前登录用户：${loginUserName}`}</h1>
        <Button
          type="primary"
          onClick={() => {
            callback('getUser').then(res => {
              console.log('子页面得到数据:res', res)
            })
          }}>获取数据</Button>
        <Button
          type="primary"
          onClick={() => {
            callback('getSystemConfig', {}).then(res => {
              console.log('子页面得到数据:res', res)
            })
          }}>获取系统配置</Button>
        <Button
          type="primary"
          onClick={() => {
            window.parent.postMessage({
              name: 'loginUserChange_Callback',
              data: {
                name: 'APP2',
              },
            }, '*');
          }}>切换成功</Button>

      </header>
    </div>
  )
}

export default Start