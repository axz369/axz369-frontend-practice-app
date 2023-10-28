import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState } from "react";
import { DeleteModal } from "@/components/DeleteModal";
import useFeatchPostDetail from "@/hooks/useFeatchPostDetail";
import details from "./details.module.css";
import { Button } from "@/components/Button/index";
import { Title } from "@/components/Title/index";
import { Container } from "@/components/Container/index";

export default function Details() {
  //modalの表示非表示を管理するstate
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const { postId } = router.query;

  // FeatchDetailコンポーネントを呼び出してデータを取得
  const { data, isLoading, isError } = useFeatchPostDetail();

  //削除ボタンが押されたらmodalをの表示をtrueにする
  const ShowModal = () => {
    setShowModal(true);
  };

  // データが正常に取得された場合
  return (
    <>
      <Container>
        <div className={details.indexBtn}>
          <Link className={details.indexBtnText} href={"/index"}>
            <Button color="gray" size="large">
              一覧に戻る
            </Button>
          </Link>
        </div>

        <Title>記事詳細</Title>

        <div>
          <p className={details.title}>{data?.title}</p>
          <p className={details.content}>{data?.content}</p>
        </div>

        <div className={details.buttons}>
          <Button color="red" size="small" onClick={ShowModal}>
            削除
          </Button>
          {/* 子コンポーネントのDeleteModalを呼び出す */}
          <DeleteModal
            showFlag={showModal}
            onModalClose={() => setShowModal(false)} //閉じる操作しかさせない
          />

          <div className={details.editButton}>
            <Link className={details.edit} href={`../${postId}/edit`}>
              <Button color="gray" size="small">
                編集
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
