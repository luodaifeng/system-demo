import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
export default function BreadcrumbNav({ title, subTitle }) {
  return (

    <div>
      <Breadcrumb style={{ padding: '10px' }}>
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
        <Breadcrumb.Item>{subTitle}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}