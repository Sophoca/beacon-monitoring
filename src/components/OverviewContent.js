import styled from 'styled-components';
import Widget from './Widget';

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
                alignItems: 'center',
                flex: 1
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3 style={{ flex: 1, margin: 10 }}>{el.location}</h3>
            </div>
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
