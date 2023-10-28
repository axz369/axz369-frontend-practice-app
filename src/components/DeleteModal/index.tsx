import { Modal } from "../Modal";
import DeleteModalStyle from "./DeleteModalStyle.module.css";
import { useDeletePost } from "@/hooks/useDeletePosts";
import { Button } from "@/components/Button/index";

//propsをdetailから受け取る
type Props = {
  showFlag: boolean;
  //引数も返り値も持たない関数を表す
  onModalClose: () => void;
};

export const DeleteModal = (props: Props) => {
  //削除機能を読み込み
  const { onDelete } = useDeletePost();

  return (
    //Modalコンポーネントを呼び出し、詳細ページから受け取ったpropsをさらにModalコンポーネントに渡している
    <Modal showFlag={props.showFlag}>
      <p className={DeleteModalStyle.confirmation}>削除しますか？</p>
      <div className={DeleteModalStyle.buttons}>
        {/* //詳細ページから受け取ったonModalClose(setShowModal(false))を実行する
        //setShowModal(false)なので閉じる操作しかしない */}
        <Button onClick={props.onModalClose} color={"gray"} size="small">
          閉じる
        </Button>
        <Button onClick={onDelete} color={"red"} size="small">
          削除
        </Button>
      </div>
    </Modal>
  );
};
