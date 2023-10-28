import { baseURL } from "@/baseURL";
import axios from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

//useMutationフックで定義されたミューテーション関数であるdeletePost
const deletePost = async (postId: string) => {
  const api = `${baseURL}/${postId}`;
  const res = await axios.delete(api);
  return res.data;
};

//削除するためのカスタムフック
export const useDeletePost = () => {
  const router = useRouter();
  const { postId } = router.query;

  //useMutationは第一引数にミューテーション処理を指定し、
  //第二引数にはそれが成功したり失敗した場合に実行する関数を指定する
  const mutation = useMutation(() => deletePost(postId as string), {
    onSuccess: () => {
      console.log("成功しました");
      router.push("/index");
    },
    onError: (err) => {
      console.log("削除に失敗しました");
    },
  });

  //削除ボタンが押された時に実行される関数
  const onDelete = () => {
    //reactQueryのuseMutationフックで定義されたミューテーション関数を実行するためのもの
    //mutation処理が入った変数を実行している。
    mutation.mutate();
  };

  //ボタンを押した時実行する関数を渡す
  return { onDelete };
};
