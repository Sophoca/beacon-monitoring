import styled from 'styled-components';
import Widget from './Widget';

const Title1 = styled.div`
    font-size: medium;
    margin-left: 10px;
`;
const Title2 = styled.div`
    font-size: large;
    font-weight: bold;
    margin-left: 10px;
`;

const OverviewContent = ({ el }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            borderRadius: 10,
            border: '1px solid rgb(245,245,245)',
            background: 'rgba(250, 250, 250)',
            padding: 10 + 'px'
        }}
    >
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                flex: 2,
                gap: 10
            }}
        >
            <Title1>{el.key}</Title1>
            <Title2>{el.title}</Title2>
        </div>
        <div
            style={{
                display: 'flex',
                width: 100 + '%',
                flex: 3,
                flexDirection: 'row',
                gap: 10
            }}
        >
            {el.data[1] ? (
                <>
                    <Widget
                        title="The oldest modified time"
                        description={el.data[0]}
                        style={{ flex: 1 }}
                    />
                    <Widget
                        title="The latest modified time"
                        description={el.data[1]}
                        style={{ flex: 1 }}
                    />
                </>
            ) : (
                <Widget title="Modified time" description={el.data[0]} style={{ flex: 1 }} />
            )}
        </div>
    </div>
);

export default OverviewContent;
