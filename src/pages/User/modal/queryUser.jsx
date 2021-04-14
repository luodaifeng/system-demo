import React from 'react'
import { Modal, Button, Form, Input } from 'antd';
export default function QueryUser({ data, state, handleCancel, modifyUser }) {

  const { username = '', email = '', mobile = '', id = '' } = data || {}
  console.log(mobile);
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 14, span: 16 },
  };

  const onFinish = (v) => {
    modifyUser(id, v)
    handleCancel()
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <Modal
        title="修改用户信息"
        visible={state}
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
          >
            <Input disabled placeholder={username || ''} />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '邮箱不能为空' }]}
          >
            <Input placeholder={email || ''} />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="mobile"
            rules={[{ required: true, message: '手机号不能为空' }]}
          >
            <Input placeholder={mobile || ''} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button style={{ margin: '0 8px' }} onClick={() => { handleCancel() }}>
              取消
        </Button>
            <Button type="primary" htmlType="submit" >
              确定
        </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}