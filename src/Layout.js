import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import useAsync from './useAsync';
import Aside from './Aside';
import Main from './Main';
import './Layout.css';
// BsArrowClockwise 새로고침

async function getLists(URL) {
    const response = await axios.get(URL);
    return response.data;
}

function Layout() {
    const URL = 'http://115.144.111.248:3030/api/merge/info';

    const [state] = useAsync(() => getLists(URL));
    const { loading, data, error } = state;

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다-Layout</div>;
    if (!data) return <div>반환값 없음-Layout</div>;
    return (
        <div className="layout">
            <BrowserRouter>
                <div className="aside">
                    <Aside lists={data.lists}></Aside>
                </div>
                <div className="main">
                    <Main></Main>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default Layout;
