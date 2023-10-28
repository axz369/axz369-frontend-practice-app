import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type Props = React.ComponentPropsWithoutRef<"textarea">;

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  return <textarea {...props} ref={ref} />;
});

const App = () => {
  const { register } = useForm();

  const { ref, ...rest } = register("XXX");

  return <Textarea ref={ref} {...rest} />;
};
