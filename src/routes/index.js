import About from "../pages/About";
import Home from "../pages/Home";
import Welcome from "../pages/Welcome";

export default [
    {
        path:'/about',
        element:<About/>,
        breadcrumb: ['关于','about']
    },
    {
        path:'/home',
        element:<Home/>,
        breadcrumb: ['关于','home']
    },
    {
        path:'/',
        element:<Welcome/>,
        breadcrumb: ['欢迎']
    }
]
