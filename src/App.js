import './App.css'
import 'antd/dist/reset.css'
import {Layout} from "antd";

import MyHeader from "./components/MyHeader";
import MyBody from "./components/MyBody";

const { Header, Content, Sider, Footer } = Layout;

function App() {
    return (
        <Layout>
            <Header style={{ background: '#fff', padding: 0}}>
                <MyHeader/>
            </Header>
            <MyBody></MyBody>
            <Footer style={{ textAlign: 'center'}}>
                Ant Design ©2023 Created by HZL
            </Footer>
        </Layout>
    )
}

export default App
