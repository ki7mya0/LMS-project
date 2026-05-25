import React from 'react';

const VideoPlayer = ({ videoId, title }) => {
  if (!videoId) {
    return (
      <div className="youtube-embed-box">
        <span>▶</span>
        <span>No video attached</span>
      </div>
    );
  }

  return (
    <div style={{ borderRadius: 10, overflow: 'hidden', background: '#000' }}>
      <iframe
        width="100%"
        height="220"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || 'Lesson Video'}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;