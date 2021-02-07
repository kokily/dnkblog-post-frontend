import React, { useEffect, useState } from 'react';
import marked from 'marked';
import PostToc from '../../components/post/PostToc';
import { useProviderTocDispatch } from '../../components/post/ProviderToc';
import { parseHeader } from '../../libs/toc';

interface PostTocContainerProps {
  body: string;
}

function PostTocContainer({ body }: PostTocContainerProps) {
  const [html, setHtml] = useState('');
  const dispatch = useProviderTocDispatch();

  useEffect(() => {
    if (!body) return;

    setHtml(
      marked(body, {
        breaks: true,
      })
    );

    const toc = parseHeader(html);
    dispatch({
      type: 'SET_TOC',
      payload: toc,
    });
  }, [dispatch, html]);

  return <PostToc />;
}

export default PostTocContainer;
