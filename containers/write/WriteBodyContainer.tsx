import React from 'react';
import WriteBody from '../../components/write/WriteBody';
import WriteTagContainer from './WriteTagContainer';

interface WriteBodyContainerProps {
  category: string;
  title: string;
  body: string;
  tags: string[];
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

function WriteBodyContainer({
  category,
  title,
  body,
  tags,
  setCategory,
  setTitle,
  setBody,
  setTags,
}: WriteBodyContainerProps) {
  const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeTags = (nextTags: string[]) => {
    setTags(nextTags);
  };

  return (
    <WriteBody
      category={category}
      title={title}
      body={body}
      onChangeCategory={onChangeCategory}
      onChangeTitle={onChangeTitle}
      onChangeBody={setBody}
    >
      <WriteTagContainer tags={tags} onChangeTags={onChangeTags} />
    </WriteBody>
  );
}

export default WriteBodyContainer;
