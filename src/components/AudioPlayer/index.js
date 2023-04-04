import React, {useEffect, useRef, useState} from 'react';
import {PauseCircleOutlined, PlayCircleOutlined, StepBackwardOutlined, StepForwardOutlined,
    RetweetOutlined, HeartOutlined} from "@ant-design/icons";
import './index.css'
import {shallowEqual, useSelector, useDispatch} from "react-redux";
import {getSongUrl} from "../../service/playlist";
import {changePlayIndex} from "./store"
import defaultImg from './default.jpeg'


function AudioPlayer() {
    const { curPlayList, curPlayIndex } = useSelector((state) => ({
        curPlayList: state.playList.get('playList'),
        curPlayIndex: state.playList.get('playIndex')
    }), shallowEqual)

    const [musicUrl, setMusicUrl] = useState('')
    const [currentPlay, setCurrentPlay] = useState({al:{picUrl:defaultImg},ar:[{name:'--'}],name:'----'})
    const [isPlay, setIsPlay] = useState(false)
    const [trackProgress, setTrackProgress] = useState(0)
    // const [duration, setDuration] = useState(0)

    const audioRef = useRef(new Audio(musicUrl))
    const intervalRef = useRef();
    const isReady = useRef(false)

    const { duration } = audioRef.current
    const currentPercentage = duration
        ? `${(trackProgress / duration) * 100}%`
        : "0%";
    const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
   `
    const dispatch = useDispatch()

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                toNextTrack()
            } else {
                setTrackProgress(audioRef.current.currentTime)
            }
        }, [1000]);
    }

    useEffect(() => {
        if (isPlay) {
            audioRef.current.play();
            startTimer()
            // console.log(curPlayIndex)
            // console.log(curPlayList)
            // console.log(musicUrl)
        } else {
            audioRef.current.pause();
        }
    }, [isPlay])

    useEffect(()=>{
        console.log(currentPlay)
        audioRef.current.pause()
        console.log('pause')
        getMusicUrl(curPlayList[curPlayIndex])
        audioRef.current = new Audio(musicUrl)
        setTrackProgress(audioRef.current.currentTime);
        if (isReady.current) {
            audioRef.current.play();
            setIsPlay(true);
            startTimer();
        } else {
            // Set the isReady ref as true for the next pass
            isReady.current = true;
        }
    },[curPlayList,curPlayIndex,musicUrl])

    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        };
    }, []);


    const onScrub = (value) => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    };

    const onScrubEnd = () => {
        // If not already playing, start
        if (!isPlay) {
            setIsPlay(true);
        }
        startTimer();
    };

    const playMusic = ()=>{
        // if (isPlay)
        //     audioRef.current.pause()
        // else
        //     audioRef.current.play()
        setIsPlay(!isPlay)
    }

    const getMusicUrl = (item)=>{
        if(item){
            console.log(item)
            setCurrentPlay(item)
            getSongUrl(item.id,'lossless').then(res=>{
                console.log(res)
                if(res.code === 200){
                    setMusicUrl(res.data[0].url)
                    // setDuration(res.data[0].time)
                    // audioRef.current = new Audio(res.data[0].url)
                }else {
                    console.log('error')
                }
            })
        }
    }

    const toPrevTrack = () => {
        if (curPlayIndex - 1 < 0) {
            dispatch(changePlayIndex(curPlayList.length-1))
        } else {
            dispatch(changePlayIndex(curPlayIndex-1))
        }
    };

    const toNextTrack = () => {
        if (curPlayIndex < curPlayList.length - 1) {
            dispatch(changePlayIndex(curPlayIndex+1))
        } else {
            dispatch(changePlayIndex(0))
        }
    };

    return (
        <div className={'bottomDisplay'}>
            {/*<audio  src={musicUrl} style={{marginTop:'10px'}}*/}
            {/*        // controls='controls'*/}
            {/*        // autoplay="autoplay"*/}
            {/*        ref={audioRef}*/}
            {/*>*/}
            {/*    您的浏览器不支持 audio 元素。*/}
            {/*</audio>*/}

            <div className={'playContent'}>
                <img src={currentPlay.al.picUrl}/>
                <div className={'playInfo'}>
                    <span className={'scrolling-title'}>
                        {currentPlay.name}
                    </span>
                    <div className={'singername'}>
                        {currentPlay.ar[0].name}
                    </div>
                </div>
                <div className={'playCenter'}>
                    <div style={{textAlign:"center",height:'60%'}}>
                        <HeartOutlined style={{marginRight:'40px'}} />
                        <StepBackwardOutlined style={{marginRight:'40px'}} onClick={toPrevTrack}/>
                        { isPlay ? <PauseCircleOutlined onClick={playMusic}/> : <PlayCircleOutlined onClick={playMusic}/> }
                        <StepForwardOutlined style={{marginLeft:'40px'}} onClick={toNextTrack}/>
                        <RetweetOutlined style={{marginLeft:'40px'}} />
                    </div>
                    <div style={{display:'flex',alignItems:'center',height:'40%'}}>
                        <input
                            type="range"
                            value={trackProgress}
                            step="1"
                            min="0"
                            max={duration ? duration : `${duration}`}
                            className="progress"
                            onChange={(e) => onScrub(e.target.value)}
                            onMouseUp={onScrubEnd}
                            onKeyUp={onScrubEnd}
                            style={{ background: trackStyling }}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AudioPlayer;
