import React, {useEffect, useState, useRef} from 'react'
import {useLocation} from "react-router-dom";
import {Button, Layout, message, Skeleton, Slider, Table, Tag, Typography} from "antd"
import { TagOutlined, CrownOutlined, HeartOutlined  } from '@ant-design/icons'
import './index.css'
import {getSongsDetail, getSongUrl, playlistDetail} from "../../service/playlist";
import {transformSecond} from "../../utils"
import ReactAudioPlayer from 'react-audio-player'
import {useDispatch, useSelector} from "react-redux";
import {changePlayList} from "../../components/AudioPlayer/store";
import playList from "../../components/AudioPlayer/store/reducer";
import {changePlayIndex} from "../../components/AudioPlayer/store/actionCreator";


const {Content} = Layout
const {Title,Text,Link} = Typography

function Playlist() {
    const columns = [
        {
            title: '',
            render: (text, record, index) => `${index + 1}`,  //每一页都从1开始
            // render:(text, record, index) =>
            //     `${(pagination.current - 1) * (pagination.pageSize) + (index + 1)}`
            //当前页数减1乘以每一页页数再加当前页序号+1
            rowScope: 'row',
            width: 50,
        },
        {
            title: '歌曲',
            dataIndex: 'name',
            key: 'name',
            render: (name,item) => <a onClick={e=>getMusic(e,item)}>{name}</a>,
            width: 500,
        },
        {
            title: '歌手',
            dataIndex: 'ar',
            key: 'ar',
            render: (text) => {
                return text.map((item,index)=>{
                    return(
                        <a key={index} style={{marginRight:'10px'}}>{item.name}</a>
                    )
                })
            }
        }]


    const {state:{item}} = useLocation()
    const [playList, setPlayList] = useState([])
    // const [musicUrl, setMusicUrl] = useState('')
    const [currentPlay, setCurrentPlay] = useState({al:{picUrl:''}})
    // const [isPlay, setIsPlay] = useState(false)
    const dispatch = useDispatch()
    const State =  useSelector((state) => state.playList)

    useEffect(()=>{
        playlistDetail(item.id)
            .then(res=>{
                console.log(res)
                // console.log('tracks',res.playlist.tracks)
                // console.log('trackIds',res.playlist.trackIds)
                var idArray=res.playlist.trackIds.map(x=>{return x.id}).toString()
                return idArray
            })
            .then(res=>{
                //获取歌单歌曲
                getSongsDetail(res).then(res=>{
                    let playlist = res.songs.map((obj,index)=>{
                        obj.index = index
                        return obj})
                    setPlayList(playlist)
                    setCurrentPlay(res.songs[0])
                })
            })
    },[])

    const getMusic = (e,item)=>{
        // console.log(item)
        setCurrentPlay(item)
        dispatch(changePlayList(playList))
        dispatch(changePlayIndex(item.index))
        getSongUrl(item.id,'lossless').then(res=>{
            if(res.code === 200){
                console.log(res)
                // setMusicUrl(res.data[0].url)
                // message.success('>>准备播放>>')
                // setIsPlay(true)
                // setMarks({...marks,100:transformSecond(audio.duration)})
            }else {
                console.log('error')
            }
        })
    }
    const playListAll = ()=>{
        dispatch(changePlayList(playList))
        dispatch(changePlayIndex(0))
    }
    const shoucang = ()=>{
        console.log(State.get('playList'))
        console.log(State.get('playIndex'))
    }


    return (
        <Content style={{backgroundColor:'white'}}>
            <div className={'maincontent'}>
                <div className={'playtitle'}>
                    <div>
                        <img width={'300px'} src={item.coverImgUrl}/>
                    </div>
                    <div style={{padding:'20px 20px 20px 60px',fontSize:'16px'}}>
                        <Title>{item.name}</Title>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <TagOutlined style={{paddingRight:'15px'}}/> 标签：
                            {
                                item.tags.map(
                                    (item,id)=>{
                                        return(
                                            <div key={id}>
                                                <Tag color="volcano">{item}</Tag>
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>
                        <div style={{marginTop:'10px'}}>
                            <CrownOutlined style={{paddingRight:'15px'}}/>播放量：{item.playCount}
                        </div>
                        <div style={{marginTop:'10px'}}>
                            <HeartOutlined style={{paddingRight:'15px'}}/>订阅量：{item.subscribedCount}
                        </div>
                        <div style={{marginTop:'10px'}}>
                            <Button style={{margin:10}} onClick={playListAll}>播放全部</Button>
                            <Button style={{margin:10}} onClick={shoucang}>收藏</Button>
                            <Button style={{margin:10}}>评论</Button>
                            <Button style={{margin:10}}>更多</Button>
                        </div>
                    </div>
                </div>

                <div style={{display:'flex',marginTop:30}}>
                    <div style={{width:'70%'}}>
                        <Table
                            columns={columns}
                            dataSource={playList}
                            onRow={(record) => {
                                return {
                                    onClick: (event) => {
                                        // console.log(event)
                                    }, // 点击行
                                    onDoubleClick: (event) => {
                                    },
                                    onContextMenu: (event) => {
                                    },
                                    onMouseEnter: (event) => {
                                    }, // 鼠标移入行
                                    onMouseLeave: (event) => {
                                    },
                                }
                            }}
                        />
                    </div>
                    <div style={{width:'30%',padding:'30px'}}>
                        <Title level={5}>简介</Title>
                        <p>{item.description}</p>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default Playlist;
