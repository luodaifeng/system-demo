import React from 'react'
import { message, Modal } from 'antd';
import { request } from '../../../methods/api';
export default function DelUser({ state, delUserHandleCancel, id, delUserHandleOk }) {
  const handleOk = () => {
    request('users/' + id, {}, "DELETE").then(res => {
      delUserHandleCancel()
      if (res.data.meta.status === 200) {
        message.success('删除用户成功')
        delUserHandleOk()
      } else {
        message.error(res.data.meta.msg)
      }
    })
  }
  return (
    <div>
      <Modal
        title="删除用户"
        visible={state}
        onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={delUserHandleCancel}
        okText='确定'
        cancelText='取消'
      >
        <h3>确定要删除该用户吗？？</h3>
      </Modal>

    </div>
  )
}