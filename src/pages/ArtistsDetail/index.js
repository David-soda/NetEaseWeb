import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {getArtistDetail, getArtistHotSongs, getArtistMv, getSimiArtists} from "../../service/artistdetail"
import { PlayCircleOutlined } from '@ant-design/icons'
import style from  './index.module.css'
import {Button, Popover, Table, Typography} from "antd";
import {getSongsDetail, getSongUrl} from "../../service/playlist";
import {changePlayIndex, changePlayList} from "../../components/AudioPlayer/store";
import {useDispatch} from "react-redux";
import MvShow from "../../components/MvShow";
const {Title,Text,Link} = Typography
function ArtistsDetail() {
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
    const dispatch = useDispatch()
    const [artistItem, setArtistItem] = useState(item)
    const [artistDetail, setArtistDetail] = useState('')
    const [hotSongs, setHotSongs] = useState('')
    const [playList, setPlayList] = useState([])
    const [currentPlay, setCurrentPlay] = useState({al:{picUrl:''}})
    const [artistMv, setArtistMv] = useState('')
    const [simiArtists, setSimiArtists] = useState('')
    console.log(item)
    const getMusic = (e,item)=>{
        console.log(item)
        setCurrentPlay(item)
        dispatch(changePlayList(playList))
        dispatch(changePlayIndex(item.index))
        // dispatch(changePlayIndex(9))
        getSongUrl(item.id,'lossless').then(res=>{
            if(res.code === 200){
                console.log(res)
            }else {
                console.log('error')
            }
        })
    }
    useEffect(()=>{
        getArtistDetail(artistItem.id).then(res=>{
            if(res.code === 200){
                setArtistDetail(res.data)
                console.log(res.data)
            }else {
                console.log('fail')
            }
        })
        //获取歌手热曲
        getArtistHotSongs(artistItem.id).then(res=>{
            // console.log(res.hotSongs)
            let hotSongs = res.hotSongs.map((obj,index)=>{
                obj.index = index
                return obj})
            setHotSongs(hotSongs)
            var idArray=res.hotSongs.map(x=>{return x.id}).toString()
            return idArray
        }).then(res=>{
                //获取歌单歌曲
                getSongsDetail(res).then(res=>{
                    let playlist = res.songs.map((obj,index)=>{
                        obj.index = index
                        return obj})
                    console.log(playlist)
                    setPlayList(playlist)
                    setCurrentPlay(res.songs[0])
                })
            })
        // 获取歌手 MV
        getArtistMv(artistItem.id).then(res=>{
            if(res.code === 200){
                setArtistMv(res.mvs)
            }else {
                console.log('fail')
            }
        })
        //获取相似歌手
        getSimiArtists(artistItem.id).then(res=>{
            if(res.code === 200){
                setSimiArtists(res.artists)
                console.log(res.artists)
            }else {
                console.log('fail')
            }
        })
    },[artistItem])
    const chooseArtist = (item)=>{
        console.log(item)
        setArtistItem(item)
        document.documentElement.scrollTop = 0;
    }
    return (
        <div>
            <div className={style.maincontent}>
                <div className={style.artistHeader}>
                    <img width={300} src={artistItem.img1v1Url} style={{borderRadius:300}}/>
                    <div className={style.deatil}>
                        <Title>{artistItem.name}</Title>
                        <div style={{display:"flex"}}>
                            <div className={style.desc}>
                                <span>{artistDetail.artist && artistDetail.artist.briefDesc}</span>
                            </div>
                            {
                                artistDetail.artist &&
                                <Popover placement="top" title={artistItem.name} content={artistDetail.artist.briefDesc} trigger="click">
                                    <a style={{lineHeight:'50px'}}>[更多]</a>
                                </Popover>
                            }
                        </div>
                        <div className={style.static}>
                            <div className={style.staticItem}>
                                <span className={style.attri}>专辑</span><span className={style.data}>{artistDetail.artist && artistDetail.artist.albumSize}</span>
                            </div>
                            <div className={style.staticItem}>
                                <span className={style.attri}>MV</span><span className={style.data}>{artistDetail.artist && artistDetail.artist.mvSize}</span>
                            </div>
                        </div>
                        <div style={{marginTop:20}}>
                            <Button icon={ <PlayCircleOutlined />} size={'large'}>播放歌手热门曲目</Button>
                        </div>
                    </div>
                </div>
                <div>
                    <Title level={3}>热门歌曲</Title>
                    <Table
                        columns={columns}
                        dataSource={hotSongs}
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
                <div>
                    <MvShow artistMv={artistMv}/>
                </div>
                <div>
                    <Title level={3}>相似歌手</Title>
                    <div className={style.simiartists}>
                        {
                            simiArtists && simiArtists.map((item,index)=>{
                                return(
                                    <div key={index} className={style.simiitem} onClick={()=>chooseArtist(item)}>
                                        <img src={item.img1v1Url}/>
                                        <a>{item.name}</a>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ArtistsDetail;
