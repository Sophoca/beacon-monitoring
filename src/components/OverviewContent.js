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
const ContentContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
    border: 1px solid rgb(245, 245, 245);
    background: rgb(250, 250, 250);
    padding: 10px;
`;
const Content = styled.div`
    display: flex;
    gap: 10px;
`;

const OverviewContent = ({ el }) => (
    <ContentContainer>
        <Content
            style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                flex: 2
            }}
        >
            <Title1>{el.key}</Title1>
            <Title2>{el.title}</Title2>
        </Content>
        <Content
            style={{
                flexDirection: 'row',
                flex: 3
            }}
        >
            {el.data[1] ? (
                <>
                    <Widget
                        title="Oldest modified time"
                        description={el.data[0]}
                        style={{ flex: 1 }}
                    />
                    <Widget
                        title="Latest modified time"
                        description={el.data[1]}
                        style={{ flex: 1 }}
                    />
                </>
            ) : (
                <Widget title="Modified time" description={el.data[0]} style={{ flex: 1 }} />
            )}
        </Content>
    </ContentContainer>
);

export default OverviewContent;
