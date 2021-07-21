import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { useAsync } from 'react-async';
import Aside from './Aside';
import Main from './Main';
import './Layout.css';
// BsArrowClockwise 새로고침

async function getLists({ URL }) {
    const response = await axios.get(URL);
    return response.data;
}

function Layout() {
    const URL = 'http://115.144.111.248:3030/api/merge/info';

    const { data, error, isLoading, reload } = useAsync({
        promiseFn: getLists,
        URL
    });

    if (isLoading) return <div>로딩중-Layout</div>;
    if (error) return <div>에러가 발생했습니다-Layout {console.error(error)}</div>;
    if (!data) return <div>반환값 없음-Layout</div>;

    console.log('layout', data.lists);

    return (
        <div className="layout">
            <BrowserRouter>
                <div className="aside">
                    <Aside lists={data.lists}></Aside>
                </div>
                <div className="main">
                    <Main reload={reload}></Main>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default Layout;
