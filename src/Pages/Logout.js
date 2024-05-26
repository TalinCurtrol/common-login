import React, { useEffect, useState } from 'react'
import { CURRENT_BASE_URL } from '../components/urls';
import { useNavigate } from "react-router-dom";





function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('tech')
        localStorage.removeItem('user')
        const timer = setTimeout(() => {
            window.location.href = CURRENT_BASE_URL + "/CustomerEntry"
        }, 2000); // 3000 毫秒等于 3 秒

        // 清理定时器，以防组件在定时器触发前卸载
        return () => clearTimeout(timer);

    }, [])
    return (<>Log out on going</>);

}

export default Logout;