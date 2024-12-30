import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Timeline from './components/Timeline';
import VideoLibrary from './components/VideoLibrary';
import styled from 'styled-components';

const AppContainer = styled.div`
  height: 100vh;
  background: #1e1e1e;
  color: white;
`;

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

function App() {
  return (
    <AppContainer>
      <DndProvider backend={HTML5Backend}>
        <EditorContainer>
          <VideoLibrary />
          <Timeline />
        </EditorContainer>
      </DndProvider>
    </AppContainer>
  );
}

export default App; 