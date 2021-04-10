import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'antd';
import './admin.css'

export default function Admin(props) {
  //用户没有登录跳转到登录页
  if (!localStorage.getItem('token')) {
    return <Redirect to="/login" />
  }

  //退出登录
  const logOut = () => {
    localStorage.clear('token')
    props.history.replace("/login")
  }

  return (
    <div className="admin">
      后台页面
      <Button type="primary" onClick={logOut}>退出登录</Button>
    </div>
  );
}
