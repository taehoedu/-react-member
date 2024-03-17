import React, { useEffect } from "react";

const Error = () => {

    useEffect(() => {
        console.log('[Error] useEffect()');

    }, []);

    return(
        <article>
            죄송합니다.<br />
            요청하신 페이지를 찾을 수 없습니다.<br />
            방문하시려는 페이지의 주소가 잘못 입력되었거나,<br />
            페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.<br /><br />
            입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.<br /><br />
            관련 문의사항은 OUR 고객센터에 알려주시면 친절하게 안내해 드리겠습니다.<br /><br />
            감사합니다.
        </article>
    );
}

export default Error;