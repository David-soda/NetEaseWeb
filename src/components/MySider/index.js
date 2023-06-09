import React from 'react'
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons'
import { Menu } from 'antd'
import { useState } from 'react'
import {useNavigate} from "react-router-dom";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    }
}
const items = [
    getItem('MySet', 'sub1', <SettingOutlined/>, [
        getItem('About', '1'),
        getItem('Home', '2'),
        getItem('MyItem', '3'),
        getItem('Option 4', '4'),
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    getItem('Navigation Three', 'sub4', <MailOutlined/>, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
]

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']

function MySider() {
    const [openKeys, setOpenKeys] = useState(['']);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    const navigate = useNavigate()
    const onClick = (key) => {
        // console.log(key)
        if(key.key === '1'){
            navigate('about',{
                replace:false,
            })
        }
        if(key.key === '2'){
            navigate('home',{
                replace:false,
            })
        }
        if(key.key === '3'){
            navigate('myitem',{
                replace:false,
            })
        }
    }
    return (
        <Menu
            mode="inline"
            openKeys={openKeys}
            onClick={onClick}
            onOpenChange={onOpenChange}
            style={{
                height: '100%',
                borderRight: 0,
            }}
            items={items}
        />
    )
}

export default MySider;
