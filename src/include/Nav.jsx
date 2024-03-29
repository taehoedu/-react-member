import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import { MemberContext } from "../App";
import { printLog } from '../util/logger.js';
import { SERVER_URL } from '../util/const';

const DEFAULT_COMPONENT_NAME = 'Nav';

const Nav = (props) => {

    // hook
    const [isLogin, setIsLogin] = useState(false);
    const value = useContext(MemberContext);
    const navigate = useNavigate();

    useEffect(() => {
        printLog(DEFAULT_COMPONENT_NAME, 'useEffect()');

        setIsLogin(props.isLogin);

    }, [props.isLogin]);

    // handler
    const logoutClickHandler = () => {
        printLog(DEFAULT_COMPONENT_NAME, 'logoutClickHandler()');

        ajax_member_logout();

    }

    const deleteClickHandler = () => {
        printLog(DEFAULT_COMPONENT_NAME, 'deleteClickHandler()');

        ajax_member_delete();

    }

    // ajax
    const ajax_member_logout = () => {
        printLog(DEFAULT_COMPONENT_NAME, 'ajax_member_logout()');

        $.ajax({
            url: `${SERVER_URL}/member/member_logout`,
            method: 'post',
            processData: false,
            contentType: false,
            xhrFields: { 
              withCredentials: true // 클라이언트 <-> 서버 쿠키값 공유
            },
            data: null,
            success: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX MEMBER LOGOUT COMMUNICATION SUCCESS!!');
                printLog(DEFAULT_COMPONENT_NAME, 'data', data);

                props.setIsLogin(false);
                props.setMemberId('');
                sessionStorage.removeItem('sessionID');
                // sessionStorage.clear();

                navigate("/");

            },
            error: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX MEMBER LOGOUT COMMUNICATION ERROR!!');

            },
            complete: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX MEMBER LOGOUT COMMUNICATION COMPLETE!!');

            }
        });

    }

    const ajax_member_delete = () => {
        printLog(DEFAULT_COMPONENT_NAME, 'ajax_member_delete()');

        if (!window.confirm('Are you sure you want to withdraw?')) return;

        let formData = new FormData();
        formData.append("m_id", value);
        formData.append("sessionID", sessionStorage.getItem('sessionID'));

        $.ajax({
            url: `${SERVER_URL}/member/member_delete`,
            method: 'post',
            processData: false,
            contentType: false,
            xhrFields: { 
              withCredentials: true // 클라이언트 <-> 서버 쿠키값 공유
            },
            data: formData,
            success: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX MEMBER DELETE COMMUNICATION SUCCESS!!');
                printLog(DEFAULT_COMPONENT_NAME, 'data', data);

                if (data === '') {
                    alert('[Nav] THE SESSION HAS EXPIRED!!');
                    props.setIsLogin(false);
                    props.setMemberId('');
                    sessionStorage.removeItem('sessionID');
                    return;

                }

                if (data.result <= 0) {
                    alert('[Nav] MEMBER DELETE FAIL!!');

                } else {
                    alert('[Nav] MEMBER DELETE SUCCESS!!');

                    props.setIsLogin(false);
                    props.setMemberId('');
                    sessionStorage.removeItem('sessionID');
                    navigate("/");

                }

            },
            error: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX MEMBER DELETE COMMUNICATION ERROR!!');

            },
            complete: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX MEMBER DELETE COMMUNICATION COMPLETE!!');

            }
        });

    }

    return(
        <nav>
            <Link to="/">Home</Link> &nbsp;&nbsp;
            {
                isLogin 
                ?
                    <>
                        <Link to="/member/modify">Modify</Link> &nbsp;&nbsp;
                        <Link onClick={deleteClickHandler}>Delete</Link> &nbsp;&nbsp;
                        <Link onClick={logoutClickHandler}>Logout</Link> &nbsp;&nbsp;
                    </>
                :
                    <>
                        <Link to="/member/join">Join</Link> &nbsp;&nbsp;
                        <Link to="/member/login">Login</Link> &nbsp;&nbsp;
                    </>
            }
        </nav>
    );
}

export default Nav;