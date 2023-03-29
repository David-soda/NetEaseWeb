import About from "../pages/About"
import Home from "../pages/Home"
import Welcome from "../pages/Welcome"
import Start from "../pages/Start";
import Setting from "../pages/Setting";
import MyItem from "../pages/MyItem";
import NetEase from "../pages/NetEase";
import Playlist from "../pages/Playlist";

export default [
    {
        path:'/start',
        element:<Start/>,
        breadcrumb: ['开始']
    },
    {
        path:'/netease',
        element:<NetEase/>,
        breadcrumb: ['网易云'],
        children:[
            {
                path:'playlist',
                element:<Playlist/>,
                breadcrumb: ['网易云','歌单']
            }
        ]
    },
    {
        path:'/setting',
        element:<Setting/>,
        breadcrumb: ['设置'],
        children:[
            {
                path:'about',
                element:<About/>,
                breadcrumb: ['设置','about']
            },
            {
                path:'home',
                element:<Home/>,
                breadcrumb: ['设置','home']
            },
            {
                path:'myitem',
                element:<MyItem/>,
                breadcrumb: ['设置','我的项目']
            },
            {
                path:'',
                element:<Welcome/>,
                breadcrumb: ['欢迎']
            }
        ]
    },
    {
        path:'/',
        element:<Start/>,
        breadcrumb: ['Start']
    }
]
