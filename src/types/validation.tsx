import * as yup from "yup";

// バリデーション設定
export const postsScheme = yup.object().shape({
  title: yup
    .string()
    .required("タイトルは必須項目です")
    .max(120, "タイトルは120文字以内で入力してください"),
  content: yup
    .string()
    .required("メッセージは必須項目です")
    .max(100000, "メッセージは100000文字以内で入力してください"),
});
