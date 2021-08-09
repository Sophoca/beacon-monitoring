import React from 'react';
import VideoRateControl from './VideoRateControl';
import Button from '@material-ui/core/Button';
export default class StreamedianPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bufferDuration: 10,
            socket: 'ws://localhost:8080/ws/',
            redirectNativeMediaErrors: true,
            errorHandler: this.errHandler.bind(this),
            infoHandler: this.infHandler.bind(this),
            id: this.props.id
        };

        this.player = null;
        this.restart = this.restart.bind(this);
        this.changeSource = this.changeSource.bind(this);
    }

    componentDidMount() {
        this.player = window.Streamedian.player(this.props.id, this.state);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.url !== nextProps.url;
    }

    componentDidUpdate() {
        this.changeSource(this.props.url);
        console.log('check, update!', this.props);
    }

    componentWillUnmount() {
        console.log('unmount!', this.player);
        if (this.player !== null) {
            this.player.destroy();
            this.player = null;
        }
    }

    restart() {
        if (this.player !== null) {
            this.player.player.src = this.state.source;
            this.player.destroy();
        }
        this.player = null;
        this.player = window.Streamedian.player(this.state.id, this.state);
    }

    changeSource(src) {
        this.setState({ source: src }, () => {
            this.restart();
        });
    }

    errHandler(err) {
        console.error('Error!', err.message);
        // this.changeSource(this.state.url);
        if (this.player) this.restart();
    }

    infHandler(inf) {
        this.setState({ info: inf });
    }

    render() {
        console.log('check', this.props);
        return (
            <>
                <div
                    className="rtsp-player-controller"
                    style={{ display: 'flex', gap: 10, marginBottom: 10 }}
                >
                    <Button
                        className="btn-live"
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => this.restart()}
                    >
                        Reload
                    </Button>
                    <VideoRateControl video={this.props.id} />
                </div>
                <div className="rtsp-player" style={{ border: 1 }}>
                    <video id={this.state.id} width="400" height="225" controls autoPlay>
                        {this.props.children}
                    </video>
                </div>
            </>
        );
    }
}
