import styles from "./Button.module.css";

type Props = {
  children?: React.ReactNode;
  onClick?: () => void; //onClickが設定されていれば実行できるようにする
  color?: "red" | "gray" | "blue" | "green";
  size?: "small" | "large";
  type?: "submit";
};

// type 属性を適用するための変数
const buttonType = "submit";

export const Button = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      // colorが設定されていなければデフォルトでgray
      data-color={props.color ?? "gray"}
      data-size={props.size ?? "small"}
      className={styles.base}
      type={props.type}
    >
      {props.children}
    </button>
  );
};
