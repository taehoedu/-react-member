import React, { useState } from "react";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";

const Join = () => {

    // hook
    const [mId, setMId] = useState('');
    const [mPw, setMPw] = useState('');
    const [mMail, setMMail] = useState('');
    const [mPhone, setMPhone] = useState('');
    const [mProfile, setMProfile] = useState('');

    const navigate = useNavigate();

    // handler
    const memberInfochangeHandler = (e) => {
        console.log('memberInfochangeHandler()');
        
        let input_name = e.target.name;
        let input_value = e.target.value;
        if (input_name === 'm_id') {
            setMId(input_value);

        } else if (input_name === 'm_pw') {
            setMPw(input_value);

        } else if (input_name === 'm_mail') {
            setMMail(input_value);

        } else if (input_name === 'm_phone') {
            setMPhone(input_value);

        } else if (input_name === 'm_profile') {
            setMProfile(input_value);

        }

    }

    const joinSubmitBtnClickHandler = () => {
        console.log('joinSubmitBtnClickHandler()');
        
        let form = document.member_join_form;

        if (mId === '') {
            alert('INPUT MEMBER ID!!');
            form.m_id.focus();

        } else if (mPw === '') {
            alert('INPUT MEMBER PW!!');
            form.m_pw.focus();

        } else if (mMail === '') {
            alert('INPUT MEMBER MAIL!!');
            form.m_mail.focus();

        } else if (mPhone === '') {
            alert('INPUT MEMBER PHONE!!');
            form.m_phone.focus();

        } else {
            ajax_member_join();

        }

    }

    const joinResetBtnClickHandler = () => {
        console.log('joinResetBtnClickHandler()');
        
        setMId(''); setMPw(''); setMMail(''); setMPhone(''); setMProfile('');

    }

    const ajax_member_join = () => {
        console.log('ajax_member_join()');

        let m_profiles = $('input[name="m_profile"]');
        let files = m_profiles[0].files;

        let formData = new FormData();
        formData.append("m_id", mId);
        formData.append("m_pw", mPw);
        formData.append("m_mail", mMail);
        formData.append("m_phone", mPhone);
        formData.append("m_profile_img", files[0]);

        $.ajax({
            url: 'http://localhost:8090/member/member_join',
            method: 'post',
            processData: false,
            contentType: false,
            data: formData,
            success: function(data) {
                console.log('AJAX MEMBER JOIN COMMUNICATION SUCCESS!!');
                
                if (data.result > 0) {
                    alert('MEMBER JOIN PROCESS SUCCESS!!');
                    navigate("/member/login");

                } else {
                    alert('MEMBER JOIN PROCESS FAIL!!');
                    
                    setMId('');  setMPw('');  setMMail('');  setMPhone('');  setMProfile('');

                }

            },
            error: function(data) {
                console.log('AJAX MEMBER JOIN COMMUNICATION ERROR!!');

            },
            complete: function(data) {
                console.log('AJAX MEMBER JOIN COMMUNICATION COMPLETE!!');

            }
        });

    }

    return(
        <article>
            <p>MEMBER JOIN FORM</p>
            <form name="member_join_form">
                <input type="text" name="m_id" value={mId} onChange={(e) => memberInfochangeHandler(e)} placeholder="INPUT MEMBER ID"/> <br />
                <input type="password" name="m_pw" value={mPw} onChange={(e) => memberInfochangeHandler(e)} placeholder="INPUT MEMBER PW"/> <br />
                <input type="email" name="m_mail" value={mMail} onChange={(e) => memberInfochangeHandler(e)} placeholder="INPUT MEMBER MAIL"/> <br />
                <input type="text" name="m_phone" value={mPhone} onChange={(e) => memberInfochangeHandler(e)} placeholder="INPUT MEMBER PHONE"/> <br />
                <input type="file" name="m_profile" value={mProfile} onChange={(e) => memberInfochangeHandler(e)} placeholder="SELECT MEMBER PROFILE IMAGE"></input> <br />
                <input type="button" value="JOIN" onClick={joinSubmitBtnClickHandler} />
                <input type="reset" value="RESET" onClick={joinResetBtnClickHandler} />
            </form>
        </article>
    );
}

export default Join;