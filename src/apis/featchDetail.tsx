import { useQuery } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

import { posts } from '../types/types';

export default function FeatchDetail() {
  const router = useRouter();
  const { postId } = router.query;
  const api = `http://localhost:18080/v1/note/${postId}`;

  // useQueryフックを使用してデータを取得
  const { data, isLoading, isError } = useQuery<posts>(`${postId}`, () => {
    return axios.get<posts>(api)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        // データの取得に失敗した場合のエラーハンドリング
        throw new Error('データを取得できませんでした');
      });
  });

  return { data, isLoading, isError } as {
    data: posts | undefined;
    isLoading: boolean;
    isError: boolean;
  };
}
