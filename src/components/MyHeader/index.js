import React from 'react'
import { AppstoreOutlined, SmileOutlined, SettingOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { useState } from 'react'
import {useNavigate} from "react-router-dom";

const items = [
    {
        label: '开始',
        key: 'start',
        icon: <SmileOutlined/>,
    },
    {
        label: 'Navigation Two',
        key: 'app',
        icon: <AppstoreOutlined />,
    },
    {
        label: 'Setting',
        key: 'setting',
        icon: <SettingOutlined />,
    },
    // {
    //     label: 'Navigation Three - Submenu',
    //     key: 'SubMenu',
    //     icon: <SettingOutlined />,
    //     children: [
    //         {
    //             type: 'group',
    //             label: 'Item 1',
    //             children: [
    //                 {
    //                     label: 'Option 1',
    //                     key: 'setting:1',
    //                 },
    //                 {
    //                     label: 'Option 2',
    //                     key: 'setting:2',
    //                 },
    //             ],
    //         },
    //         {
    //             type: 'group',
    //             label: 'Item 2',
    //             children: [
    //                 {
    //                     label: 'Option 3',
    //                     key: 'setting:3',
    //                 },
    //                 {
    //                     label: 'Option 4',
    //                     key: 'setting:4',
    //                 },
    //             ],
    //         },
    //     ],
    // },
    {
        label: (
            <a href="https://ant.design/components/overview-cn/" target="_blank" rel="noopener noreferrer">
                Navigation Four - Link
            </a>
        ),
        key: 'alipay',
    },
];
function MyHeader() {
    const [current, setCurrent] = useState('mail')
    const navigate = useNavigate()
    const onClick = (e) => {
        console.log('click ', e)
        if(e.key === 'start'){
            navigate('/',{
                replace:false,
            })
        }
        setCurrent(e.key);
    }
    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    )
}

export default MyHeader
