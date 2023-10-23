//モーダルの表示と閉じる処理をする

import React from "react";
import ModalStyle from "./ModalStyle.module.css";
import { useDeletePost } from "./useDeletePost";

//modalの型定義
type ModalProps = {
  showFlag: boolean;
  onModalClose: (show: boolean) => void;
};

const Modal: React.FC<ModalProps> = (props) => {
  //モーダルを閉じる機能
  const closeModal = () => {
    props.onModalClose(false);
  };

  //DeleteModalを呼び出し
  const { onDelete } = useDeletePost();

  return (
    <>
      {props.showFlag ? ( // showFlagがtrueだったらModalを表示する
        <div className={ModalStyle.overlay}>
          <div className={ModalStyle.modalContent}>
            <p className={ModalStyle.confirmation}>削除しますか？</p>

            <div className={ModalStyle.buttons}>
              <button className={ModalStyle.closeButton} onClick={closeModal}>
                閉じる
              </button>
              <button className={ModalStyle.deleteButton} onClick={onDelete}>
                削除
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></> // showFlagがfalseの場合はModalは表示しない
      )}
    </>
  );
};

export default Modal;
