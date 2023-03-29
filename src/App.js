import './App.css'
import 'antd/dist/reset.css'
import {Layout} from "antd";

import MyHeader from "./components/MyHeader";
import {useRoutes} from "react-router-dom";
import routes from "./routes";

const { Header, Content, Sider, Footer } = Layout;

function App(props) {
    const element = useRoutes(routes)
    return (
        <Layout>
            <Header style={{ background: '#fff', padding: 0}}>
                <MyHeader/>
            </Header>
            {element}
            <Footer style={{ textAlign: 'center'}}>
                Ant Design ©2023 Created by HZL
            </Footer>
        </Layout>

    )
}

export default App
