//Modalの大枠コンポーネント

import React from "react";
import ModalStyle from "./ModalStyle.module.css";

type ModalProps = {
  //子コンポーネントがあれば、
  //子要素を受け取るための型らしい
  children?: React.ReactNode;
  showFlag: boolean;
};

export const Modal: React.FC<ModalProps> = (props) => {
  //もしもDeleteModalから来たshowFlagがfalseならモーダルを表示しない
  if (!props.showFlag) return null;

  //そうでなければmodal表示
  return (
    <div className={ModalStyle.overlay}>
      {/* props.children はReactコンポーネントがデフォルトで持つプロップス */}
      {/* Modalコンポーネントの子コンポーネントのこと */}
      <div className={ModalStyle.modalContent}>{props.children}</div>
    </div>
  );
};
