import React from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import Clip from './Clip';

const TrackContainer = styled.div`
  height: 100px;
  background: #333;
  margin: 10px 0;
  position: relative;
  border: 1px solid #444;
`;

const DropZone = styled.div`
  height: 20px;
  margin: -10px 0;
  position: relative;
  z-index: 1;
  
  &:hover {
    background: rgba(74, 144, 226, 0.1);
  }
`;

const Track = ({ track, onDropClip, onCreateTrack, isLastTrack }) => {
  const [, drop] = useDrop({
    accept: 'CLIP',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const position = offset.x;
      onDropClip(track.id, item, position);
    }
  });

  const [, dropBetween] = useDrop({
    accept: 'CLIP',
    hover: (item, monitor) => {
      const isOver = monitor.isOver({ shallow: true });
      if (isOver) {
        onCreateTrack();
      }
    }
  });

  return (
    <>
      <TrackContainer ref={drop}>
        {track.clips.map(clip => (
          <Clip key={clip.id} clip={clip} />
        ))}
      </TrackContainer>
      {isLastTrack && <DropZone ref={dropBetween} />}
    </>
  );
};

export default Track; 