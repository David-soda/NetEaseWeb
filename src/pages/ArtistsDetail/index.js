import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {getArtistDetail, getArtistHotSongs} from "../../service/artistdetail"
import { PlayCircleOutlined } from '@ant-design/icons'
import './index.css'
import {Button, Popover, Table, Typography} from "antd";
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
            // render: (name,item) => <a onClick={e=>getMusic(e,item)}>{name}</a>,
            render: (name) => <a>{name}</a>,
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
    const [artistDetail, setArtistDetail] = useState('')
    const [hotSongs, setHotSongs] = useState('')
    console.log(item)
    useEffect(()=>{
        getArtistDetail(item.id).then(res=>{
            if(res.code === 200){
                setArtistDetail(res.data)
                console.log(res.data)
            }else {
                console.log('fail')
            }
        })
        getArtistHotSongs(item.id).then(res=>{
            console.log(res.hotSongs)
            setHotSongs(res.hotSongs)

        })
    },[])
    return (
        <div>
            <div className={'maincontent'}>
                <div className={'artistHeader'}>
                    <img width={300} src={item.img1v1Url} style={{borderRadius:300}}/>
                    <div className={'deatil'}>
                        <Title>{item.name}</Title>
                        <div style={{display:"flex"}}>
                            <div className={'desc'}>
                                <span>{artistDetail.artist && artistDetail.artist.briefDesc}</span>
                            </div>
                            {
                                artistDetail.artist &&
                                <Popover placement="top" title={item.name} content={artistDetail.artist.briefDesc} trigger="click">
                                    <a style={{lineHeight:'50px'}}>[更多]</a>
                                </Popover>
                            }
                        </div>
                        <div className={'static'}>
                            <div className={'staticItem'}>
                                <span className={'attri'}>专辑</span><span className={'data'}>{artistDetail.artist && artistDetail.artist.albumSize}</span>
                            </div>
                            <div className={'staticItem'}>
                                <span className={'attri'}>MV</span><span className={'data'}>{artistDetail.artist && artistDetail.artist.mvSize}</span>
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
            </div>
        </div>
    );
}

export default ArtistsDetail;
