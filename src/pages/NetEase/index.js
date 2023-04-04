import React, {useEffect, useState} from 'react'
import {getBanners, getRecPlaylist, getToplist} from '../../service/homepage'
import {Button, Carousel, Input, Layout, message, Popover, Typography} from "antd"
import { LeftOutlined, RightOutlined, PlayCircleFilled} from '@ant-design/icons'
import './index.css'
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import MySearch from "../../components/MySearch";

const {Content} = Layout
const {Title,Text,Link} = Typography
const { Search } = Input;
function NetEase() {
    const [banners,setBanners] = useState([])
    const [recCat,setRecCat] = useState(['华语','古风','欧美','流行']) //推荐种类
    const [isSelect,setIsSelect] = useState([true,false,false,false]) //推荐种类
    const [selectID,setSelectID] = useState(0) //推荐种类
    const [playlists,setPlaylists] = useState([]) //推荐歌单
    const [curIndex,setCurIndex] = useState(0)
    const [leftright,setLeftright] = useState([true,false])
    const [toplist,setToplist] = useState([])

    useEffect( ()=>{
        getBanners(0).then(res=>{
            setBanners(res.banners)
        })
        getRecPlaylist('华语',50,0).then(res=>{
            setPlaylists(res.playlists)
            // console.log(res.playlists)
        })
        getToplist().then(res=>{
            console.log(res.list)
            setToplist(res.list)
        })
    },[])
    const onChange = (currentSlide) => {
        // console.log(banners)
    }

    //选择歌单类别
    const chooseCate = (e,id)=>{
        setSelectID(id)
        let array = new Array(4).fill(false)
        array[id] = true
        setIsSelect(array)
        setCurIndex(0)
        setLeftright([true, false])
        getRecPlaylist(recCat[id],50,0).then(res=>{
            setPlaylists(res.playlists)
        })
    }
    //歌单左切换
    const toLeft = () =>{
        setCurIndex(curIndex-5)
        setLeftright([false,false])
        if(curIndex-10<0){
            setLeftright([true,false])
        }
    }
    //歌单右切换
    const toRight = () =>{
        setCurIndex(curIndex+5)
        setLeftright([false,false])
        if(curIndex+15>playlists.length) {
            setLeftright([false, true])
        }
    }
    //跳转歌单页面
    const navigate = useNavigate()
    const toPlaylist =(e,item)=>{
        console.log(item)
        navigate('playlist',{
            replace:false,
            state:{
                item
                // title:m.title,
                // content:m.content
            }
        })
    }
    return (
        <Content>
            <div>
                <Outlet/>
                <div style={{backgroundColor:'#ddd'}}>
                    <div style={{margin:'0 auto',width:'1080px',backgroundColor:"#ddd"}}>
                        <Carousel autoplay afterChange={onChange}>
                            {
                                banners.map(
                                    (item,id)=>{
                                        return(
                                            <div key={id}>
                                                <img src={item.imageUrl}/>
                                            </div>
                                        )
                                    }
                                )
                            }
                        </Carousel>
                    </div>
                </div>
                <div style={{ margin:'30px auto 0', width:'1200px'}}>
                    <Title style={{color:'#263063',textAlign:'center'}}>
                        歌 单 推 荐
                    </Title>
                    <div style={{display:'flex',justifyContent:'space-evenly'}}>
                        {
                            recCat.map(
                                (item,id)=>{
                                    return(
                                        <Button
                                            key={id}
                                            style={{color:isSelect[id]?'skyblue':'#263063'}}
                                            size='large'
                                            type="text"
                                            onClick={e=>chooseCate(e,id)}>
                                            {item}
                                        </Button>
                                    )
                                }
                            )
                        }
                    </div>
                </div>
                <div style={{display:"flex",marginTop:'20px'}}>
                    <div style={{width:'17%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <LeftOutlined style={{fontSize:'30px'}} onClick={toLeft} hidden={leftright[0]}/>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',width:'66%',height:'250px'}}>
                        {
                            playlists.slice(curIndex,curIndex+5).map(
                                (item,id)=>{
                                    return(
                                        <div key={id} onClick={e=>toPlaylist(e,item)}>
                                            <div className={'coverOuter'}>
                                                <img className={'playlistsCover'} src={item.coverImgUrl}/>
                                                <PlayCircleFilled className={'playicon'}/>
                                            </div>
                                            <div style={{width:'205px',marginTop:'10px'}}>
                                                <NavLink to="playlist">{item.name}</NavLink>
                                                {/*<a href='ww'>{item.name}</a>*/}
                                            </div>
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
                    <div style={{width:'17%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <RightOutlined style={{fontSize:'30px'}} onClick={toRight} hidden={leftright[1]}/>
                    </div>
                </div>
                <MySearch/>
                <div style={{ margin:'20px auto 0', width:'1200px'}}>
                    <Title style={{color:'#263063',textAlign:'center'}}>
                        排 行 榜
                    </Title>
                    <div style={{textAlign:"center"}}>
                        {
                            toplist.map(
                                (item,id)=> {
                                    return (
                                        <img key={id} style={{width:'200px',margin:'10px'}} src={item.coverImgUrl}/>
                                    )
                                })
                        }
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default NetEase;
