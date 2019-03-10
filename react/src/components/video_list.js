import React from 'react';
import VideoListItem from './video_list_item';

const VideoList = (props) => {
    // class기반 컴포넌트의 경우 props는 this.props로 사용해야 한다.
    return (
        <ul className="col-md-4 list-group">
            {props.videos.length}
        </ul>
    );
}

export default VideoList;