import React, { useEffect } from "react";
import $ from 'jquery';
import { printLog } from '../util/logger.js';
import { SERVER_URL } from '../util/const';

const DEFAULT_COMPONENT_NAME = 'Home';

const Home = ({setIsLogin, setMemberId}) => {

    // hook
    useEffect(() => {
        printLog(DEFAULT_COMPONENT_NAME, 'useEffect()');

        ajax_get_member(sessionStorage.getItem('sessionID'));

    }, []);

    // function 
    const ajax_get_member = (sessionID) => {
        printLog(DEFAULT_COMPONENT_NAME, 'ajax_get_member()');
    
        let formData = new FormData();
        formData.append("sessionID", sessionID);
    
        $.ajax({
            url: `${SERVER_URL}/member/get_member`,
            method: 'POST',
            processData: false,
            contentType: false,
            xhrFields: { 
              withCredentials: true // 클라이언트 <-> 서버 쿠키값 공유
            },
            data: formData,
            success: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX GET MEMBER COMMUNICATION SUCCESS!!');
                printLog(DEFAULT_COMPONENT_NAME, 'data: ', data);
    
                if (data != '') {
                  setIsLogin(true);
                  setMemberId(data.selectedMemberDto.m_id);
    
                }
    
            },
            error: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX GET MEMBER COMMUNICATION ERROR!!');
    
            },
            complete: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX GET MEMBER COMMUNICATION COMPLETE!!');
    
            }
    
        });

    }

    return(
        <article>
            <h3>HOME</h3>
            <img src="/res/img/home.png"/>
        </article>
    );

}
export default Home;