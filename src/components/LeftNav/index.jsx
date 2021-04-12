import React from 'react'
import { Menu } from 'antd';
import { Link } from 'react-router-dom'
import { UserOutlined, ShoppingOutlined, AppstoreAddOutlined, FileDoneOutlined, AppstoreOutlined, AreaChartOutlined } from '@ant-design/icons';
import './index.css'

export default function LeftNav() {
  const { SubMenu } = Menu;
  return (
    <div style={{ width: '100%' }}>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
      // inlineCollapsed={this.state.collapsed}
      >
        <SubMenu key="sub1" icon={<UserOutlined />} title="用户管理">
          <Menu.Item key="1" icon={<AppstoreOutlined />}>
            <Link to='/user'>
              用户列表
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreAddOutlined />} title="权限管理">
          <Menu.Item key="3">
            <Link to='/authority'>
              角色列表
            </Link>
          </Menu.Item>
          <Menu.Item key="4">Option 10</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<ShoppingOutlined />} title="商品管理">
          <Menu.Item key="5">Option 9</Menu.Item>
          <Menu.Item key="6">Option 10</Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" icon={<FileDoneOutlined />} title="订单管理">
          <Menu.Item key="7">Option 9</Menu.Item>
          <Menu.Item key="8">Option 10</Menu.Item>
        </SubMenu>
        <SubMenu key="sub5" icon={<AreaChartOutlined />} title="数据统计">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
        </SubMenu>
      </Menu>
    </div >
  )
}