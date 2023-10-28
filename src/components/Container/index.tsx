import styles from "./Container.module.css";

type Props = {
  children?: React.ReactNode;
};

export const Container = (props: Props) => {
  return <div className={styles.base}>{props.children}</div>;
};
