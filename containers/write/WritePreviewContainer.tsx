import React from 'react';
import WritePreview from '../../components/write/WritePreview';

interface WritePreviewContainerProps {
  category: string;
  title: string;
  body: string;
  thumbnail: string;
  tags: string[];
}

function WritePreviewContainer({
  category,
  title,
  body,
  thumbnail,
  tags,
}: WritePreviewContainerProps) {
  return (
    <WritePreview
      category={category}
      title={title}
      body={body}
      thumbnail={thumbnail}
      tags={tags}
    />
  );
}

export default WritePreviewContainer;
