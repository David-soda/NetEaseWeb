import React from 'react'
import {Layout} from "antd"
import MySider from "../../components/MySider";
import MyContent from "../../components/MyContent";
const { Header, Content, Sider, Footer } = Layout

function Setting() {
    return (
        <Layout style={{height: 'calc(100vh - 130px)'}}>
            <Sider width={200} >
                <MySider/>
            </Sider>
            <Layout style={{padding: '0 24px 24px',}}>
                <Content>
                    <MyContent/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Setting;
