import React from 'react'
import './index.css'
import {Layout,Button,Carousel,Typography,Card} from "antd"
import {ArrowRightOutlined} from '@ant-design/icons';
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const {Content} = Layout
const {Title,Text,Link} = Typography
const {Meta} = Card;
function Start() {
    return (
        <Content style={{ padding: '0 px' }}>
            <div style={{ padding:'30px 260px 0'}}>
                <div style={{padding:'20px',width:'400px'}}>
                    <Title>Discover More</Title>
                    <Text>Power bigger research and better decisions with the world's most robust drug knowledge</Text>
                    <br/>
                    <Button type={"primary"} style={{marginTop:'20px'}}>CHAT WITH US</Button>
                </div>
                <Carousel autoplay style={{margin:'auto'}}>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
                <div style={{display:"flex",justifyContent:'space-evenly',marginTop:'30px'}}>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </div>
                <div style={{padding:'40px',backgroundColor:'#161F44',borderRadius:'15px',marginTop:'30px'}}>
                    <div style={{display:"flex",justifyContent:'space-between',alignItems:'center'}}>
                        <div style={{color:'white'}}>
                            <h2>Try DrugBank for Free!</h2>
                            <p>Request an API trial or data sample today.</p>
                        </div>
                        <Button shape="round" size="large">Try It !!</Button>
                    </div>
                </div>
                <div style={{textAlign:"center",margin:'50px 0 30px'}}>
                    <Title style={{color:'#263063'}}>
                        MyBank's latest updates
                    </Title>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <div className={'leftbox'}>
                            <Title level={3}>
                                Powered by DrugBank presents Synkwise:
                                A Comprehensive Residential Care Management Tool
                            </Title>
                            <Link href="https://ant.design" target="_blank">
                                Read Full Article <ArrowRightOutlined />
                            </Link>
                        </div>
                        <div className={'rightbox'}>
                            <div className={'right-item'}>
                                <Title level={3}>
                                    Data-Centric AI is Making Waves
                                </Title>
                                <Link href="https://ant.design" target="_blank">
                                    Read Full Article <ArrowRightOutlined />
                                </Link>
                            </div>
                            <div className={'right-item'}>
                                <Title level={3}>
                                    eBook: Your Guide to Quality Drug Data
                                </Title>
                                <Link href="https://ant.design" target="_blank">
                                    Read Full Article <ArrowRightOutlined />
                                </Link>
                            </div>
                            <div className={'right-item'}>
                                <Title level={3}>
                                    A Year in Review: DrugBank’s 2022 Highlights
                                </Title>
                                <Link href="https://ant.design" target="_blank">
                                    Read Full Article <ArrowRightOutlined />
                                </Link>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </Content>
    );
}

export default Start;
