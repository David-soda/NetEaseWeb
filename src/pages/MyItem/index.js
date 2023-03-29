import React, {useState} from 'react'
import { Button, Input, Space, message} from 'antd'



function MyItem() {
    const [messageApi, contextHolder] = message.useMessage();
    const [name,setName] = useState('')
    const submitInfo = ()=>{
        console.log(name)
        messageApi.open({
            type: 'success',
            content: `我是${name}`,
            className: 'custom-class',
            style: {
                marginTop: '20vh',
            },
        })
    }
    return (
        <div>
            {contextHolder}
            <Space.Compact style={{width: '30%',}}>
                <Input defaultValue="Combine input and button" value={name} onChange={e=>setName(e.target.value)}/>
                <Button type="primary" onClick={submitInfo}>Submit</Button>
            </Space.Compact>
        </div>
    );
}

export default MyItem;
