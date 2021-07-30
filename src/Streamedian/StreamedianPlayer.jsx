import React from 'react';
import VideoRateControl from './VideoRateControl';

export default class StreamedianPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bufferDuration: 30,
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
        this.restart();
    }

    infHandler(inf) {
        this.setState({ info: inf });
    }

    render() {
        return (
            <div className="rtsp-player">
                <video id={this.state.id} width="720" height="480" controls autoPlay>
                    {this.props.children}
                </video>
                <div className="rtsp-player-controller">
                    <button onClick={() => this.restart()}>Reload</button>
                    <VideoRateControl video={this.props.id} />
                    <button
                        onClick={() =>
                            this.changeSource(
                                'rtsp://admin:admin1234@218.153.209.100:501/cam/realmonitor?channel=7&subtype=1'
                            )
                        }
                    >
                        next cam
                    </button>
                    <button
                        onClick={() =>
                            this.changeSource(
                                'rtsp://admin:admin1234@218.153.209.100:501/cam/realmonitor?channel=5&subtype=1'
                            )
                        }
                    >
                        prev cam
                    </button>
                </div>
            </div>
        );
    }
}
