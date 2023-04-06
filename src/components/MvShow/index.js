import React from 'react';
import style from './index.module.css'
import {Typography} from "antd";
import {PlayCircleFilled} from "@ant-design/icons"
import {getMvUrl} from "../../service/artistdetail";
import {useNavigate} from "react-router-dom";


const {Title,Text,Link} = Typography
function MvShow(props) {
    const {artistMv} = props
    // const navigate = useNavigate()
    console.log(artistMv)
    const mvPlay = (item)=>{
        console.log(item)
        getMvUrl(item.id,1080).then(res=>{
            if(res.code === 200){
                console.log(res.data)
                // navigate(res.data.url,{
                //     replace:false,
                //     state:{
                //         item
                //         // title:m.title,
                //         // content:m.content
                //     }
                // })
                window.open(res.data.url)
            }else {
                console.log('fail')
            }
        })
    }
    return (
        <div>
            {
                artistMv[0]&&<Title level={3}>MV</Title>
            }
            <div className={style.mvbox}>
                {
                    artistMv && artistMv.map(
                        (item,index)=>{
                            return(
                                <div className={style.mvitem} onClick={()=>mvPlay(item)}>
                                    <div className={style.coverOuter}>
                                        <img className={style.mvimg} src={item.imgurl}/>
                                        <PlayCircleFilled className={style.playicon}/>
                                    </div>
                                    <a className={style.mvtitle}>{item.name}</a>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    );
}

export default MvShow;
