import React from "react";
import ModalStyle from "./ModalStyle.module.css";

//modalの型定義
type ModalProps = {
  showFlag: boolean;
  onModalClose: (show: boolean) => void;
  onDelete: () => void;
};

const DeleteModal: React.FC<ModalProps> = (props) => {
  //モーダルを閉じるボタン
  const closeModal = () => {
    props.onModalClose(false);
  };

  //削除機能
  const onClickDelete = () => {
    // editページの削除処理を実行
    props.onDelete();
    closeModal(); // モーダルを閉じる
  };

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
              <button
                className={ModalStyle.deleteButton}
                onClick={onClickDelete}
              >
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

export default DeleteModal;
