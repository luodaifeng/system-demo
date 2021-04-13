import React from 'react'
import { Modal, Button, Form, Input } from 'antd';
export default function AddUser({ state, handleCancel, onFinish }) {

  const [form] = Form.useForm();

  const handleOk = () => {
    console.log('确定');
  }
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 14, span: 16 },
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.resetFields()
    handleCancel()
  }
  return (
    <div>
      <Modal
        title="添加用户"
        visible={state}
        onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
        afterClose={() => form.resetFields()}
      >
        <Form
          form={form}
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '用户名不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '密码不能为空' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '邮箱不能为空' }]}
          >
            <Input />
          </Form.Item> <Form.Item
            label="手机号"
            name="mobile"
            rules={[{ required: true, message: '手机号不能为空' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary"
              onClick={onReset}
              style={{ margin: '0 8px' }}>
              重置
        </Button>
            <Button type="primary" htmlType="submit">
              确定
        </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}