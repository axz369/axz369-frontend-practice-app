import { baseURL } from "@/baseURL";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { Posts } from "../types/types";

//データの詳細を取得するためのカスタムフック
export default function useFeatchPostDetail() {
  const router = useRouter();
  const { postId } = router.query;
  const api = `${baseURL}/${postId}`;

  // useQueryフックを使用してデータを取得してその結果をconst { data, isLoading, isError }に入れている
  //useQueryの第一引数は文字列で渡す
  const { data, isLoading, isError } = useQuery<Posts>(
    `${postId}`,
    async () => {
      try {
        const res = await axios.get<Posts>(api);
        return res.data;
      } catch (err) {
        throw new Error("データの取得に失敗しました");
      }
    }
  );

  //useQueryを使って取得したデータを返す
  return { data, isLoading, isError } as {
    data: Posts | undefined;
    isLoading: boolean;
    isError: boolean;
  };
}
