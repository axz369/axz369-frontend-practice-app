//投稿を削除する処理を書く
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import Modal from "./Modal";
import ModalStyle from "./ModalStyle.module.css";

type DeleteModalProps = {
  showFlag: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export const useDeletePost = () => {
  const router = useRouter();
  const { postId } = router.query;

  const onDelete = () => {
    const api = `http://localhost:5000/posts/${postId}`;
    axios
      .delete(api)
      .then(() => {
        console.log("成功しました");
        // indexへ遷移
        router.push("../../");
      })
      .catch((err) => {
        console.log("データ送信に失敗しました", err);
      });
  };
  //onclose();

  return { onDelete };
};
