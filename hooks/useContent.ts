/*
  This project currently uses static JSON content.
  The previous implementation referenced React Query + an Axios CMS client,
  but those dependencies are not installed and were blocking `next build`.
*/

'use client';

import { useMemo } from 'react';
import contentJson from '../data/content.json';

export const useContent = () => {
  const content = useMemo(() => contentJson, []);

  return {
    content,
    loading: false,
    error: null as unknown,
  };
};

export default useContent;