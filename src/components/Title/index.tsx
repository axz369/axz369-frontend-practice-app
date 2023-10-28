import styles from "./Title.module.css";

type Props = {
  children?: React.ReactNode;
};

export const Title = (props: Props) => {
  return <p className={styles.base}>{props.children}</p>;
};
