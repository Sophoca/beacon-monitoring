import React from 'react';
import Button from '@material-ui/core/Button';

export default class VideoRateControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playbackRate: 1.0,
            playbackRateText: 'live'
        };

        this.video = null;
        this.updatePlaybackRate = this.updatePlaybackRate.bind(this);
        this.livePlaybackRate = this.livePlaybackRate.bind(this);
    }

    componentDidMount() {
        this.video = document.getElementById(this.props.video);
        this.setState({ playbackRate: this.video.playbackRate });
        this.setState({ playbackRateText: this.video.playbackRate });
    }

    updatePlaybackRate(event) {
        this.setState({ playbackRate: event.target.value });
        this.setState({ playbackRateText: event.target.value });
    }

    livePlaybackRate(event) {
        this.setState({ playbackRate: 1 });
        this.setState({ playbackRateText: 'live' });
        if (this.video.buffered.length) {
            this.video.currentTime = this.video.buffered.end(0);
        }
    }

    render() {
        return (
            <Button
                className="btn-live"
                variant="contained"
                color="primary"
                size="small"
                onClick={this.livePlaybackRate}
            >
                Live
            </Button>
        );
    }
}
