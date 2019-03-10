import React from 'react';

const VideoDetail = ({video}) => {
    if (!video) {
        return <div>Loading....</div>;
    }

    const videoId = video.id.videoId;
    // ES6에서 사용하는 구문으로 아래 2개는 같은 동작을 한다.
    //const url = 'https://www.youtube.com/embed' + videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="video-detail col-md-8">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed=responsive-item" src={url}></iframe>
            </div>
            <div className="details">
                <div>{video.snippet.title}</div>
                <div>{video.snippet.description}</div>
            </div>
        </div>
    );
};

export default VideoDetail;