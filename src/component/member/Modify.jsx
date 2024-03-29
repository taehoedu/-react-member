import React, { useContext, useEffect, useState } from "react";
import $, { ajax } from 'jquery';
import { useNavigate } from "react-router-dom";
import { MemberContext } from "../../App";
import ProFileThum from "./ProFileThum";
import { SERVER_URL } from '../../util/const';

const IMAGE_SERVER_BASIC_URL = 'http://127.0.0.1:8090/memberpjt';   // 14.42.124.125

const Modify = () => {

    // hook
    const [curMId, setCurMId] = useState('');
    const [curMMail, setCurMMail] = useState('');
    const [curMPhone, setCurMPhone] = useState('');

    const [mId, setMId] = useState('');
    const [mMail, setMMail] = useState('');
    const [mPhone, setMPhone] = useState('');

    const value = useContext(MemberContext);

    useEffect(() => {
        console.log('[Modify] useEffect()');

        if (value === '') {
            navigate('/');
        
        } else {
            ajax_get_member(sessionStorage.getItem('sessionID'));
        }

    }, []);

    const navigate = useNavigate();

    // handler
    const memberInfochangeHandler = (e) => {
        console.log('[Modify] memberInfochangeHandler()');
        
        let input_name = e.target.name;
        let input_value = e.target.value;
        if (input_name === 'm_mail') {
            setMMail(input_value);

        } else if (input_name === 'm_phone') {
            setMPhone(input_value);

        } 

    }

    const modifySubmitBtnClickHandler = () => {
        console.log('[Modify] modifySubmitBtnClickHandler()');
        
        let form = document.member_modify_form;

        if (mMail === '') {
            alert('INPUT MEMBER MAIL!!');
            form.m_mail.focus();

        } else if (mPhone === '') {
            alert('INPUT MEMBER PHONE!!');
            form.m_phone.focus();

        } else {
            ajax_member_modify();

        }

    }

    const modifyResetBtnClickHandler = () => {
        console.log('[Modify] modifyResetBtnClickHandler()');

        setMId(curMId); 
        setMMail(curMMail);  
        setMPhone(curMPhone);

    }

    const ajax_get_member = (sessionID) => {
        console.log('ajax_get_member()');

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
                console.log('[Modify] AJAX GET MEMBER COMMUNICATION SUCCESS!!');
                
                if (data == null) {
                    navigate("/");
                    return;
                }

                setMId(data.selectedMemberDto.m_id);
                setMMail(data.selectedMemberDto.m_mail);
                setMPhone(data.selectedMemberDto.m_phone);

                setCurMId(data.selectedMemberDto.m_id);
                setCurMMail(data.selectedMemberDto.m_mail);
                setCurMPhone(data.selectedMemberDto.m_phone);

            },
            error: function(data) {
                console.log('[Modify] AJAX GET MEMBER COMMUNICATION ERROR!!');

            },
            complete: function(data) {
                console.log('[Modify] AJAX GET MEMBER COMMUNICATION COMPLETE!!');

            }

        });

    }

    const ajax_member_modify = () => {
        console.log('ajax_member_modify()');

        let m_profiles = $('input[name="m_profile"]');
        let files = m_profiles[0].files;

        let formData = new FormData();
        formData.append("m_id", mId);
        formData.append("m_mail", mMail);
        formData.append("m_phone", mPhone);
        if (files.length !== undefined) formData.append("m_profile_img", files[0]);

        $.ajax({
            url: `${SERVER_URL}/member/member_modify`,
            method: 'post',
            processData: false,
            contentType: false,
            xhrFields: { 
              withCredentials: true // 클라이언트 <-> 서버 쿠키값 공유
            },
            data: formData,
            success: function(data) {
                console.log('[Modify] AJAX MEMBER MODIFY COMMUNICATION SUCCESS!!');
                
                if (data.result > 0) {
                    alert('[Modify] MEMBER MODIFY PROCESS SUCCESS!!');

                } else {
                    alert('[Modify] MEMBER MODIFY PROCESS FAIL!!');

                }

                navigate("/");

            },
            error: function(data) {
                console.log('[Modify] AJAX MEMBER MODIFY COMMUNICATION ERROR!!');

            },
            complete: function(data) {
                console.log('[Modify] AJAX MEMBER MODIFY COMMUNICATION COMPLETE!!');

            }
        });

    }

    return(
        <>
            {
                value !== '' 
                ?
                <article>
                    <p>MEMBER MODIFY FORM</p>
                    <ProFileThum />
                    <form name="member_modify_form">
                        <input type="text" name="m_id" value={mId} readOnly disabled /> <br />
                        <input type="password" name="m_pw" value="******" readOnly disabled /> <br />
                        <input type="email" name="m_mail" value={mMail} onChange={(e) => memberInfochangeHandler(e)} placeholder="INPUT MEMBER MAIL"/> <br />
                        <input type="text" name="m_phone" value={mPhone} onChange={(e) => memberInfochangeHandler(e)} placeholder="INPUT MEMBER PHONE"/> <br />
                        <input type="file" name="m_profile" onChange={(e) => memberInfochangeHandler(e)} placeholder="SELECT MEMBER PROFILE IMAGE"></input> <br />
                        <input type="button" value="MODIFY" onClick={modifySubmitBtnClickHandler} />
                        <input type="reset" value="RESET" onClick={modifyResetBtnClickHandler} />
                    </form>
                </article>
                :
                null
            }

        </>
    );
}

export default Modify;