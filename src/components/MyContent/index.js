import React, {useEffect, useState} from 'react'
import {Breadcrumb} from "antd"
import {Layout} from "antd"
import {useSelector,useDispatch} from 'react-redux'

import {Outlet, useOutlet} from "react-router-dom"

import {setbread} from "../../redux/actions/bread";


const {Content} = Layout
function MyContent() {
    // const element = useRoutes(routes)
    const outlet = useOutlet()
    // console.log(outlet.props.children.props.match.route.breadcrumb)
    const bc = outlet.props.children.props.match.route.breadcrumb
    const [breadCrumbName, setbreadCrumbName] = useState(bc)
    const dispatch = useDispatch()
    const bread=useSelector((state) => state).bread
    // console.log('bread',bread)
    useEffect(()=>{
        setbreadCrumbName(bc)
        dispatch(setbread(breadCrumbName))
        // console.log(element.props.match.route.breadcrumb)
        // console.log(breadCrumbName)
        // return ()=>{
        //     console.log('return',bread)
        // }
    })

    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                {
                    bread.map(
                        (item,id)=>{
                            return(
                                <Breadcrumb.Item key={id}>{item}</Breadcrumb.Item>
                            )
                        }
                    )
                }
            </Breadcrumb>


            <Content
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: "white",
                }}
            >
                <Outlet/>
            </Content>
        </div>
    );
}


export default MyContent

