import { useRouter } from "next/router";
import { useQuery, QueryClient } from "react-query";
import axios from "axios";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { posts } from "../../../types/types";
import React, { useState } from "react";
import FeatchDetail from "@/apis/featchDetail";
import create from "../create.module.css";
import * as yup from "yup";
import { postsScheme } from "@/types/validation";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Edit() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postsScheme),
  });
  const router = useRouter();
  const { postId } = router.query;
  const [titleValidationErrors, setTitleValidationErrors] = useState("");
  const [contentValidationErrors, setContentValidationErrors] = useState("");
  const api = `http://localhost:18080/v1/note/${postId}`;

  // 対象の詳細データを取得
  const { data, isLoading, isError } = FeatchDetail();
  // ローディング中の場合
  if (!data) return <p>Loading...</p>;

  const onSubmit: SubmitHandler<{ title: string; content: string }> = async (
    data
  ) => {
    try {
      const postData = { title: data.title, content: data.content };
      await axios.put(api, postData);
      console.log("成功しました");
      router.push("/");
    } catch (err) {
      console.log("データが送信できませんでした", err);
    }
  };

  // データが正常に取得された場合
  return (
    <div className={create.container}>
      <div className={create.indexBtn}>
        <Link className={create.indexBtnText} href={"/"}>
          一覧画面へ戻る
        </Link>
      </div>

      <h1 className={create.h1}>編集ページ</h1>
      <form className={create.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={create.formGroup}>
            <label htmlFor="title">タイトル:</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  defaultValue={data.title}
                  className={create.titleErea}
                  type="text"
                  {...field}
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
                <textarea
                  defaultValue={data.content}
                  className={create.contentErea}
                  {...field}
                />
              )}
            />
            <p className={create.error}>{errors.content?.message}</p>
          </div>
        </div>
        <div className={create.createButtonContainer}>
          <button className={create.createButton} type="submit">
            編集
          </button>
        </div>
      </form>
    </div>
  );
}
