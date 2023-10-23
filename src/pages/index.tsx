import { useQuery, QueryClient } from "react-query";
import axios from "axios";
import Link from "next/link";
import { posts } from "../types/types";
import index from "./index.module.css";

const createPath = "/post/create";

type ApiResponse = {
  items: posts[];
};

export default function Home() {
  const queryClient = new QueryClient();
  const api = "http://localhost:5000/posts";

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<posts[]>("posts", async () => {
    try {
      const response = await axios.get<ApiResponse>(api);
      console.log(response.data);
      return response.data.items;
    } catch (err) {
      throw new Error("データの取得に失敗しました");
    }
  });

  if (isLoading) {
    console.log("読み込み中");
  }

  return (
    <>
      <div className={index.container}>
        <h1 className={index.h1}>記事一覧</h1>
        {posts?.map((post) => (
          <div key={post.id} className={index.itemTitle}>
            <Link className={index.title} href={`/post/${post.id}`}>
              {post.title}
            </Link>
          </div>
        ))}
        <div className={index.addBtn}>
          <Link className={index.add} href={`${createPath}`}>
            Add
          </Link>
        </div>
      </div>
    </>
  );
}
