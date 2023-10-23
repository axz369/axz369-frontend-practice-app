import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import * as yup from "yup";
import { posts } from "../../types/types";
import create from "./create.module.css";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { postsScheme } from "@/types/validation";

const api = "http://localhost:18080/v1/note";

export default function Create() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postsScheme),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<{ title: string; content: string }> = async (
    data
  ) => {
    try {
      const postData = { title: data.title, content: data.content };
      await axios.post(api, postData);
      console.log("成功しました");
      router.push("/");
    } catch (err) {
      console.log("データが送信できませんでした", err);
    }
  };

  return (
    <div className={create.container}>
      <div className={create.indexBtn}>
        <Link className={create.indexBtnText} href={"/"}>
          一覧画面へ戻る
        </Link>
      </div>

      <h1 className={create.h1}>作成ページ</h1>
      <form className={create.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className={create.formGroup}>
            <label htmlFor="title">タイトル:</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input className={create.titleErea} type="text" {...field} />
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
                <textarea className={create.contentErea} {...field} />
              )}
            />
            <p className={create.error}>{errors.content?.message}</p>
          </div>
        </div>
        <div className={create.createButtonContainer}>
          <button className={create.createButton} type="submit">
            投稿
          </button>
        </div>
      </form>
    </div>
  );
}
