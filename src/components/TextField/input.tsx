import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type Props = React.ComponentPropsWithoutRef<"input">;

export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <input type="text" {...props} ref={ref} />;
});

const App = () => {
  const { register } = useForm();

  const { ref, ...rest } = register("XXX");

  return <Input ref={ref} {...rest} />;
};
