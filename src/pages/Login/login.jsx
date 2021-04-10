import React from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../methods/api'
import { Form, Input, Button, message } from 'antd';
import './login.css'

function Login(props) {
  const [form] = Form.useForm();

  //用户登录后不能跳转到登录页
  if (localStorage.getItem('token')) {
    return <Redirect to="/" />
  }

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  //登录按钮输入值有效
  const onFinish = (values) => {
    api('login', values, 'POST').then(res => {
      if (res.data?.meta?.status === 200) {
        message.success('登陆成功！！！')
        setTimeout(() => {
          props.history.replace("/")
        }, 100) 
        localStorage.setItem("token", res.data.data.token);
      } else {
        message.error('用户名或密码有误！！！')
        form.resetFields()
      }
    })
  };

  //登录按钮输入值无效
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  }
  return (
    <div className='box'>
      <div className="content">
        <Form
          {...layout}
          form={form}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="用户名："
            name="username"
            rules={[
              {
                required: true,
                message: '用户名不能为空！！！',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码："
            name="password"
            rules={[
              {
                required: true,
                message: '密码不能为空！！！',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              登录
           </Button>
            <Button
              type="primary"
              onClick={() => { form.resetFields() }}
              style={{ margin: '0 8px' }}>
              重置
           </Button>

          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
