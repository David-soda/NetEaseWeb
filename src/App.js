import './App.css'
import 'antd/dist/reset.css'
import './App.css'
import {Layout} from "antd";

import MyHeader from "./components/MyHeader";
import MySider from "./components/MySider";
import MyContent from "./components/MyContent";

const { Header, Content, Sider, Footer } = Layout;

function App() {
    return (
        <Layout>
            <Header style={{ background: '#fff', padding: 0, display:'flex',justifyContent:'center' }}>
                <MyHeader/>
            </Header>
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
            <Footer style={{ textAlign: 'center'}}>
                Ant Design ©2023 Created by HZL
            </Footer>
        </Layout>

    )
}

export default App
