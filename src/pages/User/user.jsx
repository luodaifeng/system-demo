import React, { useEffect, useState, useCallback } from 'react';
import { request } from '../../methods/api'
import BreadcrumbNav from '../../components/Breadcrumb'
import { Input, Button, Table, Switch, Spin, Pagination, message, Tooltip } from 'antd';
import { AimOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddUser from './modal/addUser'
import DelUser from './modal/delUser'

import './user.css'
export default function User() {
  const [params, setParams] = useState( //默认入参
    {
      pagenum: 1,
      pagesize: 5,
      query: ''
    }
  )

  const [tableData, setTableData] = useState([])//表格数据

  const [loading, setLoading] = useState(true) //loading

  const [total, setTotal] = useState(0)//默认条数

  const [addUserT, setAddUserT] = useState(false) //添加用户弹出框

  const [delUserT, setDelUserT] = useState(false) //添加用户弹出框

  const [delUserId, setDelUserId] = useState(0) //用户id

  const [delState, setDelState] = useState(false)

  const getData = (url, data, type = 'GET') => {
    request(url, { ...data }, type).then(res => {
      setLoading(true)
      if (res.status === 200) {
        setTotal(res?.data?.data?.total)
        const initData = res.data?.data?.users
        initData.forEach((element, index) => {
          element.key = index + 1
        });
        setTableData([...initData])
        setLoading(false)
      } else {
        setTotal(0)
        setTableData([])
      }
    })
  }

  useEffect(() => {
    getData('users', params)
  }, [params, delState])

  //搜索
  const onSearch = useCallback((v) => {
    setParams({ ...params, query: v })
  }, [params])

  //switch开关
  const switchClick = (v) => {
    console.log(v);
    request(`users/${v.id}/state/${!v.mg_state}`, {}, 'PUT').then(res => {
      setDelState(!delState)
      if (res.data.meta.status === 200) {
        message.success('设置用户状态成功！！！！')
      } else (
        message.success('设置用户状态失败！！！！')
      )
    })
  }

  //分页
  const pagenumOnchange = useCallback((size) => {
    setParams({ ...params, pagenum: size })
  }, [params])
  const { Search } = Input;

  //添加用户
  const onFinish = (values) => {
    request('users', values, "POSt").then(res => {
      setAddUserT(false)
      if (res.data.meta.status === 201) {
        message.success('添加用户成功')
        setDelState(!delState)
      } else {
        message.error(res.data.meta.msg)
      }
    }).catch(e => {
      setAddUserT(false)
    })
  };

  //删除用户
  const userDelete = (v) => {
    setDelUserId(v.id)
    setDelUserT(true)

  }

  const columns = [
    {
      title: 'id',
      dataIndex: 'key',
      key: 'key'
    },
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '电话',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '角色',
      dataIndex: 'role_name',
      key: 'role_name',
    },
    {
      title: '状态',
      dataIndex: 'mg_state',
      key: 'mg_state',
      render: (state, value) => (
        <>
          <Switch checked={value.mg_state} onClick={() => { switchClick(value) }} />
        </>
      )
    },
    {
      title: '操作',
      dataIndex: '',
      key: '',
      render: (operation, value) => (
        <>
          <Button type="primary" shape="circle" icon={<EditOutlined />} />
          <Tooltip title="删除" color='#ff4d4f' key={1}>
            <Button type="primary" shape="circle" danger icon={<DeleteOutlined />} style={{ margin: '0 10px' }} onClick={() => { userDelete(value) }} />
          </Tooltip>
          <Button type="primary" shape="circle" icon={<AimOutlined />} style={{ background: '#e09423', borderColor: '#e09423' }} />
        </>
      )
    }
  ]
  return (
    <div className='user'>
      {/* 面包屑导航 */}
      <BreadcrumbNav title='用户管理' subTitle='用户列表' />

      {/* 表格内容 */}
      <div className='content'>
        <div className='search'>
          <Search placeholder="请输入内容" onSearch={onSearch} enterButton allowClear={true} />
          <Button
            type="primary"
            style={{ marginLeft: '20px' }}
            onClick={() => { setAddUserT(true) }}
          >添加用户</Button>
        </div>
        <Spin spinning={loading}>
          <div className='table'>
            <Table
              columns={columns}
              dataSource={tableData}
              bordered
            />
          </div>
        </Spin>
        <Pagination
          pageSize={5}
          total={total}
          onChange={pagenumOnchange}
        />
      </div>

      {/* 添加用户弹出框 */}
      <AddUser state={addUserT} handleCancel={() => { setAddUserT(false) }} onFinish={onFinish} />
      < DelUser
        state={delUserT}
        delUserHandleCancel={() => { setDelUserT(false) }}
        delUserHandleOk={() => { setDelState(!delState) }}
        id={delUserId}
      />
    </div>
  )
}