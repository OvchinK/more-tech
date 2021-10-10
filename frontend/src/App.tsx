import {Layout, Row,Col} from "antd";
import {BrowserRouter as Router} from "react-router-dom";
import logo from "./img/logo.png";
import {renderRoutes, routes} from "./routes";
import "antd/dist/antd.css";
import "./App.css";


const {Header, Content, Footer} = Layout;

function App() {

    return (
        <Router>
            <Layout style={{minHeight: '100vh'}}>
                <Header style={{padding: 0,boxShadow: '0 0 1px 0 rgb(0 0 0 / 70%), 0 3px 4px -2px rgb(0 0 0 / 50%)'}}>
                    <img src={logo} width={100} height={40} style={{padding: 5, marginLeft: 15}}/>
                </Header>
                <Content style={{margin: "24px 16px 0"}}>
                    <Row>
                        <Col xl={24}>
                            <Row style={{display:'flex',justifyContent:'center'}}>
                                {renderRoutes(routes)}
                            </Row>
                        </Col>

                    </Row>
                </Content>
                <Footer style={{textAlign: "center", background: '#001529',}}>
                    <h3 style={{color: '#fff'}}>
                        SATA © 2021
                    </h3>
                </Footer>
            </Layout>
        </Router>


    );
}

export default App;
