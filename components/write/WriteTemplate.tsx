import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import oc from 'open-color';

interface WriteTemplateProps {
  header: React.ReactNode;
  content: React.ReactNode;
  preview: React.ReactNode;
  leftLand: any;
  divideLand: any;
  rightLand: any;
  onDivideMouseDown: (e) => void;
}

function WriteTemplate({
  header,
  content,
  preview,
  leftLand,
  divideLand,
  rightLand,
  onDivideMouseDown,
}: WriteTemplateProps) {
  return (
    <>
      <WriteGlobal />

      <WriteBox>
        {header}

        <div className="areas">
          <div className="area content" style={leftLand}>
            {content}
          </div>
          <div className="divide" style={divideLand} onMouseDown={onDivideMouseDown} />
          <div className="area preview" style={rightLand}>
            {preview}
          </div>
        </div>
      </WriteBox>
    </>
  );
}

export default WriteTemplate;

// Styles
const WriteGlobal = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    box-sizing: border-box;
    background: ${oc.gray[4]};
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

const WriteBox = styled.div`
  .areas {
    height: calc(100vh - 4rem);
    display: flex;
    position: relative;
    .area {
      display: flex;
      min-width: 0;
      overflow: auto;
    }
    .divide {
      height: 100%;
      position: absolute;
      transform: translate(-50%);
      color: col-resize;
    }
    @media (max-width: 800px) {
      .content {
        flex: 1 !important;
      }
      .content,
      .preview {
        display: none;
      }
    }
  }
`;
