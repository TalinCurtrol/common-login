import React, { useEffect, useState } from 'react'

import { useNavigate } from "react-router-dom";





function Logout() {
    let navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear('tech')
        sessionStorage.clear('user')
        navigate("/TechnicianEntry")

    }, [])
    return (<>Log out on going</>);

}

export default Logout;