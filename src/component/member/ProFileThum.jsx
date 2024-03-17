import React, { useContext, useEffect, useState } from "react";
import $, { ajax } from 'jquery';
import { useNavigate } from "react-router-dom";
import { MemberContext } from "../../App";
import { printLog } from '../../util/logger.js';

const DEFAULT_COMPONENT_NAME = 'ProFileThum';
const IMAGE_SERVER_BASIC_URL = 'http://127.0.0.1:8090/memberpjt';   // 14.42.124.125

const ProFileThum = () => {

    // hook
    const [mId, setMId] = useState('');

    const [curMProfileThum, setCurMProfileThum] = useState('');
    const [profileThumDtos, setProfileThumDtos] = useState(null);
    const [profileThumDtoIdx, setProfileThumDtoIdx] = useState(0);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const value = useContext(MemberContext);
    const navigate = useNavigate();

    useEffect(() => {
        printLog(DEFAULT_COMPONENT_NAME, 'useEffect()');

        if (value === '') {
            navigate('/');
        
        } else {
            ajax_get_member(sessionStorage.getItem('sessionID'));
            ajax_get_profile_thums(value);
        }

    }, []);

    // handler
    const deleteProfileThumHandler = () => {
        printLog(DEFAULT_COMPONENT_NAME, 'deleteProfileThumHandler()');
        
        ajax_delete_profile_thum(value);
        
    }

    const profileThumClickHandler = () => {
        printLog(DEFAULT_COMPONENT_NAME, 'profileThumClickHandler()');
        
        setProfileThumDtoIdx(0);

        setShowProfileModal(v => true);        

    }

    const profileModalCloseBtnClickHandler = () => {
        printLog(DEFAULT_COMPONENT_NAME, 'profileModalCloseBtnClickHandler()');

        setShowProfileModal(v => false);

    }

    const profileThumNextBtnClickHandler = () => {
        printLog(DEFAULT_COMPONENT_NAME, 'profileThumNextBtnClickHandler()');

        setProfileThumDtoIdx((idx) => {
            idx++;
            if (idx >= profileThumDtos.length)
                idx = 0;

            return idx;

        });

    }

    const profileThumPreBtnClickHandler = () => {
        printLog(DEFAULT_COMPONENT_NAME, 'profileThumPreBtnClickHandler()');

        setProfileThumDtoIdx((idx) => {
            idx--;
            if (idx < 0)
                idx = profileThumDtos.length - 1;

            return idx;

        });

    }

    // ajax
    const ajax_get_member = (sessionID) => {
        printLog(DEFAULT_COMPONENT_NAME, 'ajax_get_member()');

        let formData = new FormData();
        formData.append("sessionID", sessionID);

        $.ajax({
            url: 'http://localhost:8090/member/get_member',
            method: 'POST',
            processData: false,
            contentType: false,
            xhrFields: { 
                withCredentials: true // 클라이언트 <-> 서버 쿠키값 공유
            },
            data: formData,
            success: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX GET MEMBER COMMUNICATION SUCCESS!!');
                
                if (data == null) {
                    navigate("/");
                    return;
                }

                setMId(data.selectedMemberDto.m_id);
                setCurMProfileThum(data.selectedMemberDto.m_profile_thum);                

            },
            error: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX GET MEMBER COMMUNICATION ERROR!!');

            },
            complete: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX GET MEMBER COMMUNICATION COMPLETE!!');

            }

        });

    }

    const ajax_get_profile_thums = (mId) => {
        printLog(DEFAULT_COMPONENT_NAME, 'ajax_get_profile_thums()');

        let formData = new FormData();
        formData.append("m_id", mId);

        $.ajax({
            url: 'http://localhost:8090/member/get_profile_thums',
            method: 'post',
            processData: false,
            contentType: false,
            xhrFields: { 
              withCredentials: true // 클라이언트 <-> 서버 쿠키값 공유
            },
            data: formData,
            success: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX GET PROFILE THUM COMMUNICATION SUCCESS!!');
                
                setProfileThumDtos(data.profileThumDtos);

            },
            error: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX GET PROFILE THUM COMMUNICATION ERROR!!');

            },
            complete: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX GET PROFILE THUM COMMUNICATION COMPLETE!!');

            }
        });
    }

    const ajax_delete_profile_thum = (mId) => {
        printLog(DEFAULT_COMPONENT_NAME, 'ajax_delete_profile_thum()');

        let formData = new FormData();
        formData.append("m_id", mId);

        $.ajax({
            url: 'http://localhost:8090/member/delete_profile_thum',
            method: 'post',
            processData: false,
            contentType: false,
            xhrFields: { 
              withCredentials: true // 클라이언트 <-> 서버 쿠키값 공유
            },
            data: formData,
            success: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX DELETE PROFILE THUM COMMUNICATION SUCCESS!!');

                if (data.result > 0){
                    console.log('success!!');
                    setCurMProfileThum(null);

                } else {
                    console.log('fail!!');
                    
                }

            },
            error: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX DELETE PROFILE THUM COMMUNICATION ERROR!!');

            },
            complete: function(data) {
                printLog(DEFAULT_COMPONENT_NAME, 'AJAX DELETE PROFILE THUM COMMUNICATION COMPLETE!!');

            }
        });
    }

    return(
        <>
            <p>
            {    
                curMProfileThum != null
                ?
                    <>
                        <a href="#none" onClick={profileThumClickHandler}>
                            <img src={`${IMAGE_SERVER_BASIC_URL}/${mId}/${curMProfileThum}`} 
                                    style={{maxWidth: '100px', minWidth: '100px', borderRadius: '50px'}}/>
                        </a>
                        <br />
                        <a href="#none" onClick={deleteProfileThumHandler}>대표이미지 삭제</a>
                    </>
                :
                    <>
                        <img src="/res/img/profile_default.png" 
                                style={{maxWidth: '100px', minWidth: '100px', borderRadius: '50px'}}/>
                    </>    
            }
            </p>

            {
                showProfileModal
                ?
                    <div id="profile_modal_wrap">
                        <div className="profile_thum_close">
                            <a href="#none" onClick={profileModalCloseBtnClickHandler}>CLOSE</a>
                        </div>
                        <div className="profile_thum">
                            <div className="pre_btn">
                                <a href="#none" onClick={profileThumPreBtnClickHandler}>PRE_BTN</a>
                            </div>
                            <div className="thum">
                                <img src={`${IMAGE_SERVER_BASIC_URL}/${mId}/${profileThumDtos[profileThumDtoIdx]['pt_thum']}`}/>
                            </div>
                            <div className="next_btn">
                                <a href="#none" onClick={profileThumNextBtnClickHandler}>NEXT_BTN</a>
                            </div>
                        </div>
                    </div>
                :
                null
            }
        </>
    );
}

export default ProFileThum;