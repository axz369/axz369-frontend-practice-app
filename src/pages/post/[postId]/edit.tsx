import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import React from "react";
import useFeatchPostDetail from "@/hooks/useFeatchPostDetail";
import create from "@/pages/post/create/create.module.css";
import { postsScheme } from "@/types/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { Posts } from "@/types/types";
import { baseURL } from "@/baseURL";
import { Button } from "@/components/Button/index";
import { Title } from "@/components/Title/index";
import { Container } from "@/components/Container/index";
import { Input } from "@/components/TextField/input";
import {Textarea} from "@/components/TextField/textarea";

export default function Edit() {
  //useFromからフォーム制御に必要なものを取得する
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //オプションとしてバリデーションも取得する。バリデーションルールは自作したもの
    resolver: yupResolver(postsScheme),
  });

  const router = useRouter();
  const { postId } = router.query;
  const api = `${baseURL}/${postId}`;

  // 対象の詳細データを取得
  const { data, isLoading, isError } = useFeatchPostDetail();

  // 編集処理 データの型としてidを除く
  const editPostMutation = async (postData: Omit<Posts, "id">) => {
    const response = await axios.put(api, postData);
    return response.data; // 編集されたデータを返す
  };

  //useMutationから必要なものを取得
  //editPostMutation関数をmutateとして登録
  const {
    mutate,
    isLoading: isMutating,
    isError: isMutatingError,
  } = useMutation(editPostMutation);

  //formの投稿ボタンを押したときに実行されるonSubmit
  //SubmitHandlerはReact Hook Formで使用される型らしい
  //titleとcontentをオブジェクトで受け取る
  const onSubmit: SubmitHandler<{ title: string; content: string }> = async (
    data
  ) => {
    try {
      await mutate(data); // 編集を実行
      console.log("成功しました");
      router.push("/index");
    } catch (err) {
      console.log("データが送信できませんでした", err);
    }
  };

  return (
    <Container>
      <Link className={create.indexBtnText} href={"/index"}>
        <Button color="gray" size="large">
          一覧に戻る
        </Button>
      </Link>

      <Title>編集ページ</Title>

      <form className={create.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={create.formGroup}>
            <label htmlFor="title">タイトル:</label>
            {/* reactHookFromと連携させるためにControllerコンポーネントを使用する */}
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  defaultValue={data && data.title}
                  className={create.titleErea}
                  type="text"
                  {...field} // この部分でInputコンポーネントにfieldのpropsを渡す
                />
              )}
            />
            <p className={create.error}>{errors.title?.message}</p>
          </div>
          <div className={create.formGroup}>
            <label htmlFor="content">メッセージ:</label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <Textarea
                  defaultValue={data && data.content}
                  className={create.contentErea}
                  {...field}
                />
              )}
            />
            <p className={create.error}>{errors.content?.message}</p>
          </div>
        </div>
        <div className={create.createButtonContainer}>
          <Button color="green" size="large" type="submit">
            編集
          </Button>
        </div>
      </form>
    </Container>
  );
}
