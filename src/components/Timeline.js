import React, { useState } from 'react';
import styled from 'styled-components';
import Track from './Track';

const TimelineContainer = styled.div`
  width: 100%;
  background: #1e1e1e;
  padding: 20px;
  overflow-x: auto;
`;

const Timeline = () => {
  // 初始只有一个轨道
  const [tracks, setTracks] = useState([
    { id: 1, clips: [] }
  ]);

  // 检查位置是否有重叠
  const findNonOverlappingPosition = (clips, newClip, initialPosition) => {
    let position = initialPosition;
    let hasOverlap = true;
    
    while (hasOverlap) {
      hasOverlap = clips.some(clip => {
        if (clip.id === newClip.id) return false;
        const clipEnd = clip.start + clip.duration;
        const newClipEnd = position + newClip.duration;
        return !(position >= clipEnd || newClipEnd <= clip.start);
      });

      if (hasOverlap) {
        position += 120;
      }
    }
    
    return position;
  };

  // 创建新轨道
  const createTrackBetween = (trackId) => {
    setTracks(prevTracks => {
      const index = prevTracks.findIndex(t => t.id === trackId);
      const newTrack = { 
        id: Date.now(), // 使用时间戳作为新轨道的ID
        clips: [] 
      };
      
      const newTracks = [...prevTracks];
      newTracks.splice(index + 1, 0, newTrack);
      return newTracks;
    });
  };

  const handleDropClip = (trackId, item, position) => {
    setTracks(prevTracks => {
      // 如果是现有片段，先从所有轨道中删除它
      if (item.type === 'existing') {
        prevTracks = prevTracks.map(t => ({
          ...t,
          clips: t.clips.filter(clip => clip.id !== item.id)
        }));
      }

      return prevTracks.map(track => {
        if (track.id === trackId) {
          const newClip = {
            id: item.type === 'new' ? Date.now() : item.id,
            start: position,
            duration: item.duration || 100,
            content: item.content || '视频片段'
          };
          
          const newPosition = findNonOverlappingPosition(
            track.clips,
            newClip,
            position
          );
          
          newClip.start = newPosition;
          return { ...track, clips: [...track.clips, newClip] };
        }
        return track;
      });
    });
  };

  return (
    <TimelineContainer>
      {tracks.map((track, index) => (
        <Track 
          key={track.id} 
          track={track}
          onDropClip={handleDropClip}
          onCreateTrack={() => createTrackBetween(track.id)}
          isLastTrack={index === tracks.length - 1}
        />
      ))}
    </TimelineContainer>
  );
};

export default Timeline; 