import React from 'react';
import {Outlet, Route, Routes, useRoutes} from "react-router-dom";
import routes from "../../routes";
import NetEase from "../../pages/NetEase";
import Playlist from "../../pages/Playlist";
import AudioPlayer from "../AudioPlayer";

function MyBody() {
    const element = useRoutes(routes)
    return (
        <div>
            {element}
            {/*<Outlet/>*/}
            <AudioPlayer/>
        </div>
        // <Routes>
        //     <Route path="netease" element={<NetEase />}>
        //     </Route>
        //     <Route path="playlist" element={<Playlist />} />
        // </Routes>
    );
}

export default MyBody;
