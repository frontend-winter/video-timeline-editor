import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';

const LibraryContainer = styled.div`
  padding: 20px;
  background: #2a2a2a;
  border-bottom: 1px solid #444;
`;

const VideoItem = styled.div`
  width: 120px;
  height: 80px;
  background: #4a90e2;
  margin: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: move;
  border-radius: 4px;
  
  &:hover {
    background: #357abd;
  }
`;

const DraggableVideo = ({ video }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CLIP',
    item: { 
      id: video.id,
      type: 'new',
      duration: 100,
      content: video.name
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <VideoItem
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {video.name}
    </VideoItem>
  );
};

const VideoLibrary = () => {
  const videos = [
    { id: 'video1', name: '视频1' },
    { id: 'video2', name: '视频2' },
    { id: 'video3', name: '视频3' },
  ];

  return (
    <LibraryContainer>
      {videos.map(video => (
        <DraggableVideo key={video.id} video={video} />
      ))}
    </LibraryContainer>
  );
};

export default VideoLibrary; 