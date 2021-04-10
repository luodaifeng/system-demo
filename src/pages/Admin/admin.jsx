import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Layout } from 'antd';
import './admin.css'

export default function Admin(props) {
  const { Header, Sider, Content } = Layout;
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
      <Layout style={{ height: 100 + '%' }}>
        <Header>
          <div className='header_title'>
            <h1>电商后台管理系统</h1>
          </div>
          <Button type="primary" onClick={logOut}>退出登录</Button>
        </Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>Content</Content>
        </Layout>
      </Layout>
    </div>
  );
}
