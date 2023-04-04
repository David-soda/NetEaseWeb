import React, {useEffect} from 'react'
import { AppstoreOutlined, SmileOutlined, SettingOutlined, UserOutlined, SyncOutlined, LogoutOutlined} from '@ant-design/icons'
import {Menu, Modal, Input, Space, Button, message, Form, Typography, QRCode} from 'antd'
import { useState } from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import { sendRegisterCode, visitUser, getQrKey, getQrCreate } from '../../service/login'
import {shallowEqual, useDispatch, useSelector} from "react-redux"
import {getLoginProfileInfo, getLoginProfileInfoQr, userInfoLogout} from "../SysLogin/store/actionCreator"

const { Text, Link } = Typography

function MyHeader() {
    const { pathname } = useLocation()
    const [items, setItems] = useState([])
    const [isPhone, setIsPhone] = useState(false)
    const [isQrCode, setIsQrCode] = useState(true)
    const [isVisit, setIsVisit] = useState(true)
    const [current, setCurrent] = useState('start')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [phoneNum, setPhoneNum] = useState('')
    const [veriCode, setVeriCode] = useState('')
    const [isSendSatte, setIsSendSatte] = useState(false)  //验证码发送状态
    const [second, setSecond] = useState(60) //60s
    const [qrUrl, setQrUrl] =useState('hello')
    const dispatch = useDispatch()
    const { isLogin, cookie } = useSelector((state) => ({
        isLogin: state.loginState.get('isLogin'),
        cookie: state.loginState.get('cookie')
    }), shallowEqual)

    useEffect(()=>{
        let cur = pathname.slice(1)
        // console.log(cur.split("/"))
        setCurrent(cur.split("/")[0])
    },[])

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false)
        setIsQrCode(true)
        setIsVisit(true)
        setIsPhone(false)
    }
    //表单无误，进行登录
    const onFinish = (values) => {
        // console.log('Success:', values)
        const { phoneNum, code } = values
        dispatch(getLoginProfileInfo(phoneNum,code))
    }
    //表单有误
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('格式有误！！')
    };
    const navigate = useNavigate()
    //菜单点击事件
    const onClick = (e) => {
        console.log('click ', e)
        if(e.key === 'login'){
            showModal()
        }else if(e.key === 'logout'){
            handleLogout()
        } else {
            navigate(e.key,{
                replace:false
            })
            setCurrent(e.key)
        }
    }
    const handleSendCode = () => {
        //60秒延迟定时器
        if (!isSendSatte) {
            let i = 0
            const timer = setInterval(() => {
                i++
                setSecond(second - i)
                if (i >= 60) {
                    clearInterval(timer)
                    setIsSendSatte(false)
                    setSecond(60)
                }
            }, 1000)
            // 发送验证码
            !isSendSatte &&
            sendRegisterCode(phoneNum).then((res) => {
                if (res.code === 200) message.success('发送成功')
                else message.warn('发送失败, 请60秒后发送验证码')
            })
        }
        setIsSendSatte(true)
    }
    const choosePhone = ()=>{
        setIsQrCode(true)
        setIsVisit(true)
        setIsPhone(false)
    }
    // const State =  useSelector((state) => state).loginState
    // console.log(State.get('isLogin')) //登录状态
    const chooseQrcode =()=>{
        setIsPhone(true)
        setIsVisit(true)
        setIsQrCode(false)
        console.log(cookie)
        // getQrKey().then(res=>{
        //     setUnikey(res.data.unikey)
        //     getQrCreate(res.data.unikey).then(res=>{
        //         console.log(res)
        //         setQrUrl(res.data.qrurl)
        //         dispatch(getLoginProfileInfoQr(unikey))
        //     })
        // })
    }
    const chooseVisit =()=>{
        setIsPhone(true)
        setIsQrCode(true)
        setIsVisit(false)
        // visitUser().then(res=>{
        //     console.log(res)
        // })
    }
    const refreshQr = async ()=>{
        let {data:{unikey}} = await getQrKey()  //获取二维码key
        console.log(unikey)
        let res = await getQrCreate(unikey)     //生成二维码url
        console.log(res)
        if(res.code === 200){
            message.success('刷新成功')
            setQrUrl(res.data.qrurl)
        }else{
            message.error('刷新失败')
        }
        dispatch(getLoginProfileInfoQr(unikey))
    }
    const State =  useSelector((state) => state.loginState)
    //登出
    const handleLogout = ()=>{
        message.success('登出成功')
        // dispatch(userInfoLogout())
        console.log(State)
    }

    useEffect(()=>{
        if(isLogin){
            setItems([
                {
                    label: '开始',
                    key: 'start',
                    icon: <SmileOutlined/>,
                },
                {
                    label: 'Net Ease Cloud',
                    key: 'netease',
                    icon: <AppstoreOutlined />,
                },
                {
                    label: 'Setting',
                    key: 'setting',
                    icon: <SettingOutlined />,
                },
                {
                    label: 'Logout',
                    key: 'logout',
                    icon: <LogoutOutlined />,
                }
            ])
            setIsModalOpen(false)
        }else{
            setItems([
                {
                    label: '开始',
                    key: 'start',
                    icon: <SmileOutlined/>,
                },
                {
                    label: 'Net Ease Cloud',
                    key: 'netease',
                    icon: <AppstoreOutlined />,
                },
                {
                    label: 'Setting',
                    key: 'setting',
                    icon: <SettingOutlined />,
                },
                {
                    label: 'Login',
                    key: 'login',
                    icon: <UserOutlined />,
                }
            ])
        }
    })

    return (
        <div>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            <Modal title="登 录" open={isModalOpen}  onCancel={handleCancel} footer>
                <Form style={{width:'100%',padding:'5% 15% 3%',textAlign:'center',height:'190px'}}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      name="basic"
                      hidden={isPhone}
                >
                    <Form.Item
                        name="phoneNum"
                        rules={[
                            {
                                pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
                                message: `请输入正确的手机号`,
                            },
                            { required: true, message: '请输入你的手机号' },
                        ]}
                    >
                        <Input
                            addonBefore="+86"
                            placeholder="请输入手机号"
                            value={phoneNum}
                            onChange={e=>setPhoneNum(e.target.value)}
                        />
                    </Form.Item>
                    <div style={{display:"flex",justifyContent:'space-between'}}>
                        <Form.Item
                            name="code"
                            rules={[{ pattern: /[0-9a-zA-Z._-]{4,20}/, message: '验证码最短4位' }, { required: true, message: '请输入你的验证码' }]}
                        >
                            <Input
                                placeholder="请输入短信验证码"
                                value={veriCode}
                                onChange={e=>setVeriCode(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={handleSendCode}>{isSendSatte ? second + 's后重发' : '发送验证码'}</Button>
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button htmlType="submit" type="primary" style={{width:'40%'}} ghost>登录</Button>
                    </Form.Item>
                </Form>
                <div hidden={isQrCode} style={{display:"flex",flexDirection:'column',height:'190px'}}>
                    <QRCode value={qrUrl}
                            style={{margin:'0 auto 0'}}
                            width={100}
                            fgColor="#000000"  //二维码的颜色
                    />
                    <SyncOutlined style={{margin:'auto'}} onClick={refreshQr}/>
                </div>
                <div hidden={isVisit} style={{height:'190px'}}>

                </div>
                <div style={{display:"flex",justifyContent:'space-evenly'}}>
                    <Link onClick={choosePhone} target="_blank">
                        手机号登录
                    </Link>
                    <Link onClick={chooseQrcode} target="_blank">
                        二维码登录
                    </Link>
                    <Link onClick={chooseVisit} target="_blank">
                        游客访问
                    </Link>
                </div>
            </Modal>
        </div>
    )
}

export default MyHeader
