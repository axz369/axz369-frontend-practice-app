//indexページのデータを取得する処理
import { baseURL } from "@/baseURL";
import { useQuery } from "react-query";
import axios from "axios";
import { Posts } from "../types/types";

type ApiResponse = {
  items: Posts[];
};

//投稿一覧を取得するカスタムフック
export default function useFetchIndex() {
  const api = baseURL;

  //useQueryを使ってデータを取得して const {data: posts,isLoading,isError,}にデータを取得している
  //useQueryは第一引数に一意のクエリキー、第二引数にデータ取得をする処理を書く
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<Posts[]>("posts", async () => {
    try {
      const response = await axios.get<ApiResponse>(api);
      return response.data;
    } catch (err) {
      throw new Error("データの取得に失敗しました");
    }
  });

  //useQueryを使って取得したデータを渡す
  return { posts, isLoading, isError } as {
    posts: Posts[]; //配列で一覧を渡す
    isLoading: boolean;
    isError: boolean;
  };
}
