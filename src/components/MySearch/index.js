import React, {useState} from 'react'
import {Input, Typography} from "antd"
import './index.css'
import {getSuggestKeywords} from "../../service/homepage"
import { BulbOutlined } from '@ant-design/icons'
import {useNavigate} from "react-router-dom";

const { Search } = Input;
const {Title,Text,Link} = Typography

function MySearch() {
    const [searchFocused, setSearchFocused] = useState(false)
    const [searchResult, setSearchResult] = useState(false);
    const onSearchSong = (value)=>{
        console.log(value)
    }
    const onSearchChange = (e)=>{
        if(e.target.value){
            getSuggestKeywords(e.target.value).then(res=>{
                if(res.code===200){
                    console.log(res.result)
                    setSearchResult(res.result)
                }
            })
        }
    }
    //跳转歌单页面
    const navigate = useNavigate()
    const toArtists =(e,item)=>{
        console.log('artists',item)
        navigate('artistdetail',{
            replace:false,
            state:{
                item
            }
        })
    }
    const toPlaylist =(e,item)=>{
        console.log('playlist',item)
        // navigate('playlist',{
        //     replace:false,
        //     state:{
        //         item
        //         // title:m.title,
        //         // content:m.content
        //     }
        // })
    }
    return (
        <div className={'Searchbox'} >
            <div className={'SearchContent'}>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearchSong}
                    onChange={onSearchChange}
                    onFocus={()=>{setSearchFocused(true)}}
                    onBlur={() => setSearchFocused(false)}
                />
            </div>
            <div className={'SearchInfo'}>
                {
                    // searchFocused &&
                    searchResult.order &&
                    searchResult.order.map((item,index)=>{
                        return(
                            <div className={'resultSort'} key={index}>
                                <div className={'searchLeft'}>
                                    <BulbOutlined />
                                    {
                                        item==='songs' && <span>歌曲</span> ||
                                        item==='artists' && <span>艺人</span> ||
                                        item==='albums' && <span>专辑</span> ||
                                        item==='playlists' && <span>歌单</span>
                                    }
                                </div>
                                <div style={{width:'85%'}}>
                                    {
                                        item==='songs' && searchResult.songs && searchResult.songs.map((item,index)=>{
                                            return(
                                                <div className={'lineInfo'}>
                                                    <span>{item.name}</span>
                                                </div>
                                            )
                                        }) ||
                                        item==='artists' && searchResult.artists && searchResult.artists.map((item,index)=>{
                                            return(
                                                <div className={'lineInfo'} onClick={e=>toArtists(e,item)}>
                                                    <span>{item.name}</span>
                                                </div>
                                            )
                                        }) ||
                                        item==='albums' && searchResult.albums && searchResult.albums.map((item,index)=>{
                                            return(
                                                <div className={'lineInfo'}>
                                                    <span>{item.name}</span>
                                                </div>
                                            )
                                        }) ||
                                        item==='playlists' && searchResult.playlists && searchResult.playlists.map((item,index)=>{
                                            return(
                                                <div className={'lineInfo'} onClick={e=>toPlaylist(e,item)}>
                                                    <span>{item.name}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default MySearch;
