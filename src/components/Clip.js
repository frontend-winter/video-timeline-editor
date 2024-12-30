import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';

const ClipContainer = styled.div`
  position: absolute;
  height: 80%;
  background: #4a90e2;
  border-radius: 4px;
  top: 10%;
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  user-select: none;
  
  &:hover {
    background: #357abd;
  }
`;

const ResizeHandle = styled.div`
  position: absolute;
  width: 10px;
  height: 100%;
  cursor: col-resize;
  
  &.left {
    left: 0;
  }
  
  &.right {
    right: 0;
  }
`;

const Clip = ({ clip }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CLIP',
    item: { 
      ...clip,
      type: 'existing'
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <ClipContainer
      ref={drag}
      style={{
        left: clip.start,
        width: clip.duration,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <ResizeHandle className="left" />
      {clip.content}
      <ResizeHandle className="right" />
    </ClipContainer>
  );
};

export default Clip; 