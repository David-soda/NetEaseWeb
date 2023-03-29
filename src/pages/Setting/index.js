import React from 'react'
import {Layout} from "antd"
import MySider from "../../components/MySider"
import MyContent from "../../components/MyContent"
const {Content, Sider} = Layout

function Setting() {
    return (
        <Layout style={{padding: '15px 20px 20px'}}>
            <Sider width={200}  >
                <MySider/>
            </Sider>
            <Layout style={{padding: '0px 25px 24px'}}>
                <Content>
                    <MyContent/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Setting;
