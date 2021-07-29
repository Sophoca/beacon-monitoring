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
            infoHandler: this.infHandler.bind(this)
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
        if (this.player) {
            this.player.destroy();
            this.player = null;
        }
    }

    restart() {
        this.player.player.src = this.state.source;
        this.player.destroy();
        this.player = null;
        this.player = window.Streamedian.player(this.props.id, this.state);
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
                <video id={this.props.id} width="720" controls autoPlay>
                    {this.props.children}
                </video>
                <div className="rtsp-player-controller">
                    <button onClick={() => this.restart}>Reload</button>
                    <VideoRateControl video={this.props.id} />
                    <button
                        onClick={() =>
                            this.changeSource(
                                'rtsp://admin:admin1234@218.153.209.100:501/cam/realmonitor?channel=7&subtype=1'
                            )
                        }
                    >
                        new cam
                    </button>
                </div>
            </div>
        );
    }
}
