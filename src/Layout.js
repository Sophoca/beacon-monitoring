import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import useAsync from './useAsync';
import Aside from './Aside';
import Main from './Main';
import './Layout.css';
// BsArrowClockwise 새로고침

async function getLists() {
    const response = await axios.get('http://115.144.111.248:3030/api/merge/info');
    return response.data;
}

function Layout() {
    const [state, refetch] = useAsync(getLists);
    const { loading, data, error } = state;
    //console.log(state.data);

    // const [lists, setLists] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    // const fetchLists = async () => {
    //     try {
    //         // 요청이 시작 할 때에는 error 와 users 를 초기화하고
    //         setError(null);
    //         setLists(null);
    //         // loading 상태를 true 로 바꿉니다.
    //         setLoading(true);
    //         const res = await axios.get(URL);
    //         setLists(res.data.lists);
    //     } catch (e) {
    //         setError(e);
    //     }
    //     setLoading(false);
    // };

    // useEffect(() => {
    //     fetchLists();
    // }, []);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!data) return <div>반환값 없음</div>;
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
