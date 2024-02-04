import React, { useState, useEffect } from 'react'
import { Button } from 'antd';
import logo from '../../logo.svg';

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
            window.parent.postMessage({
              type: 'loginUserChange_Callback',
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