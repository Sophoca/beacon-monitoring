import React from 'react';
import VideoRateControl from './VideoRateControl';
export default class StreamedianPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bufferDuration: 10,
            socket: 'ws://localhost:8080/ws/',
            redirectNativeMediaErrors: true,
            errorHandler: this.errHandler.bind(this),
            infoHandler: this.infHandler.bind(this),
            id: this.props.id,
            // add
            continuousFileLength: 180000,
            eventFileLength: 10000,
            canvas: 'video_canvas'
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
        console.error(err.message);
        // this.restart();
    }

    infHandler(inf) {
        this.setState({ info: inf });
    }

    render() {
        console.log('check', this.props);
        return (
            <>
                <canvas id="video_canvas" width="0" height="0"></canvas>
                <video id={this.state.id} width="720" height="480" controls autoPlay>
                    {this.props.children}
                </video>
                <div className="rtsp-player-controller">
                    <button onClick={() => this.restart()}>Reload</button>
                    <VideoRateControl video={this.props.id} />
                </div>
            </>
        );
    }
}
