import React, { useContext, useEffect } from "react";
import { MemberContext } from "../App";

const Header = () => {

    // hook
    const value = useContext(MemberContext);

    useEffect(() => {
        console.log('[Header] useEffect()');

    }, []);

    return(
        <>
            <h3>MEMBER SERVICE</h3>
            <div style={{backgroundColor: 'rgba(100, 100, 100, .2)', padding: '10px 0'}}>
                <span>Logined member name: {value}</span><br />
                <span>SessionID: {sessionStorage.getItem('sessionID')}</span><br />
            </div>
        </>
    );
}

export default Header;