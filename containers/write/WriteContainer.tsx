import React, { useState } from 'react';
import WriteTemplate from '../../components/write/WriteTemplate';
import WriteBodyContainer from './WriteBodyContainer';
import WriteHeaderContainer from './WriteHeaderContainer';
import WritePreviewContainer from './WritePreviewContainer';

function WriteContainer() {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [leftRatio, setLeftRatio] = useState(0.5);
  const leftLand = { flex: leftRatio };
  const divideLand = { left: `${leftRatio * 100}` };
  const rightLand = { flex: 1 - leftRatio };

  // Layout Mouse Move
  const onMouseMove = (e: any) => {
    setLeftRatio(e.clientX / window.innerWidth);
  };

  const onMouseUp = (e: any) => {
    document.body.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  const onDivideMouseDown = (e: any) => {
    document.body.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <WriteTemplate
      header={
        <WriteHeaderContainer
          category={category}
          title={title}
          thumbnail={thumbnail}
          tags={tags}
          body={body}
          setThumbnail={setThumbnail}
          setBody={setBody}
          update={false}
          post={null}
        />
      }
      content={
        <WriteBodyContainer
          category={category}
          title={title}
          body={body}
          tags={tags}
          setCategory={setCategory}
          setTitle={setTitle}
          setBody={setBody}
          setTags={setTags}
        />
      }
      preview={
        <WritePreviewContainer
          category={category}
          title={title}
          body={body}
          thumbnail={thumbnail}
          tags={tags}
        />
      }
      leftLand={leftLand}
      divideLand={divideLand}
      rightLand={rightLand}
      onDivideMouseDown={onDivideMouseDown}
    />
  );
}

export default WriteContainer;
