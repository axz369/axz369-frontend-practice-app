import { useRouter } from "next/router";
import { QueryClient } from "react-query";

import Link from "next/link";
import React, { useState } from "react";
import Modal from "../../components/Modal";
import FeatchDetail from "@/apis/featchDetail";
import details from "./details.module.css";

// QueryClientのインスタンスを作成
const queryClient = new QueryClient();

export default function Details() {
  //modalの表示非表示を管理するstate
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const { postId } = router.query;

  // FeatchDetailコンポーネントを呼び出してデータを取得
  const { data, isLoading, isError } = FeatchDetail();

  //削除ボタンが押されたらmodalをの表示をtrueにする
  const ShowModal = () => {
    setShowModal(true);
  };

  // データが正常に取得された場合
  return (
    <>
      <div className={details.container}>
        <div className={details.indexBtn}>
          <Link className={details.indexBtnText} href={`../`}>
            一覧画面へ戻る
          </Link>
        </div>

        <h1 className={details.h1}>記事詳細</h1>
        <div>
          <p className={details.title}>{data?.title}</p>
          <p className={details.content}>{data?.content}</p>
        </div>

        <div className={details.buttons}>
          <button className={details.deleteButton} onClick={ShowModal}>
            削除
          </button>

          <Modal showFlag={showModal} onModalClose={setShowModal} />

          <div className={details.editButton}>
            <Link className={details.edit} href={`${postId}/edit`}>
              編集
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
