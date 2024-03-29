import React, { useEffect, useState } from "react";
import $ from 'jquery';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Header from "./include/Header";
import Nav from "./include/Nav";
import Error from "./component/Error";
import Footer from "./include/Footer";
import Home from "./component/Home";
import Join from "./component/member/Join";
import Login from "./component/member/Login";
import Modify from "./component/member/Modify";
import { printLog } from './util/logger.js';
import { SERVER_URL } from './util/const';

export const MemberContext = React.createContext();

const DEFAULT_COMPONENT_NAME = 'App';

function App() {

  // hook
  const [isLogin, setIsLogin] = useState(false);
  const [memberId, setMemberId] = useState('');

  useEffect(() => {
    printLog(DEFAULT_COMPONENT_NAME, 'useEffect()');

    ajax_get_member(sessionStorage.getItem('sessionID'));

  }, [isLogin]);
  
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

  return (
    <MemberContext.Provider value={memberId}>
      <BrowserRouter>
        <Header />
        <Nav isLogin={isLogin} setIsLogin={setIsLogin} setMemberId={setMemberId} />

        <Routes>
          <Route path="/" element={<Home setIsLogin={setIsLogin} setMemberId={setMemberId} />}></Route>
          <Route path="/member/join" element={<Join setIsLogin={setIsLogin} />}></Route>
          <Route path="/member/login" element={<Login setIsLogin={setIsLogin} setMemberId={setMemberId} />}></Route>
          <Route path="/member/modify" element={<Modify />}></Route>
          <Route path="/*" element={<Error />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </MemberContext.Provider>
  );
}

export default App;
