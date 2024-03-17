import React, { useContext, useEffect, useState } from "react";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import { MemberContext } from "../../App";
import { printLog } from '../../util/logger.js';

const DEFAULT_COMPONENT_NAME = 'Login';

const Login = ({setIsLogin, setMemberId}) => {

    // hook
    const [mId, setMId] = useState('');
    const [mPw, setMPw] = useState('');

    useEffect(() => {
        printLog(DEFAULT_COMPONENT_NAME, 'useEffect()');

    }, []);

    const value = useContext(MemberContext);

    const navigate = useNavigate();

    // handler
    const memberInfochangeHandler = (e) => {
        printLog(DEFAULT_COMPONENT_NAME, 'memberInfochangeHandler()');
        
        let input_name = e.target.name;
        let input_value = e.target.value;
        if (input_name === 'm_id') {
            setMId(input_value);

        } else if (input_name === 'm_pw') {
            setMPw(input_value);

        }

    }

    const loginSubmitBtnClickHandler = () => {
        printLog(DEFAULT_COMPONENT_NAME, 'loginSubmitBtnClickHandler()');
        
        let form = document.member_join_form;

        if (mId === '') {
            alert('INPUT MEMBER ID!!');
            form.m_id.focus();

        } else if (mPw === '') {
            alert('INPUT MEMBER PW!!');
            form.m_pw.focus();

        } else {
            ajax_member_login();

        }

    }

    const loginResetBtnClickHandler = () => {
        printLog(DEFAULT_COMPONENT_NAME, 'loginResetBtnClickHandler()');
        
        setMId(''); setMPw('');

    }

    const ajax_member_login = () => {
        printLog(DEFAULT_COMPONENT_NAME, 'ajax_member_login()');

        let formData = new FormData();
        formData.append("m_id", mId);
        formData.append("m_pw", mPw);

        $.ajax({
            url: 'http://localhost:8090/member/member_login',
            method: 'post',
            processData: false,
            contentType: false,
            xhrFields: { 
                withCredentials: true // 클라이언트 <-> 서버 쿠키값 공유
            },
            data: formData,
            success: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX MEMBER LOGIN COMMUNICATION SUCCESS!!');

                if (data.selectedMemberDto != null) {
                    alert('MEMBER LOGIN PROCESS SUCCESS!!');
                                                     
                    sessionStorage.setItem('sessionID', data.sessionID);
                    setIsLogin(true);
                    setMemberId(data.selectedMemberDto.m_id);
                    navigate("/");

                } else {
                    alert('MEMBER LOGIN PROCESS FAIL!!');

                    setIsLogin(false);
                    setMId(''); setMPw('');

                }

            },
            error: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX MEMBER LOGIN COMMUNICATION ERROR!!');

            },
            complete: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX MEMBER LOGIN COMMUNICATION COMPLETE!!');

            }
        });

    }

    return(
        <article>
            <p>MEMBER LOGIN FORM</p>
            <form name="member_login_form">
                <input type="text" name="m_id" value={mId} onChange={(e) => memberInfochangeHandler(e)} placeholder="INPUT MEMBER ID"/> <br />
                <input type="password" name="m_pw" value={mPw} onChange={(e) => memberInfochangeHandler(e)} placeholder="INPUT MEMBER PW"/> <br />
                <input type="button" value="LOGIN" onClick={loginSubmitBtnClickHandler} />
                <input type="reset" value="RESET" onClick={loginResetBtnClickHandler} />
            </form>
        </article>
    );
}

export default Login;