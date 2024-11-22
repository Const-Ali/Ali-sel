import { ComponentProps } from "react";

type TVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "success"
  | "Btn-1";
type TButton = ComponentProps<"button"> & {
  variant?: TVariant;
};

function Button({ children, variant, style, ...rest }: TButton) {
  return (
    <button
      {...rest}
      style={{
        animationDuration: "duration-150",
        borderRadius: "6px",
        padding: "8px 16px",
        margin: "5px",
        ...style,
        ...chekVariant(variant),
      }}
    >
      {children}
    </button>
  );
}

export default Button;

function chekVariant(variant?: TVariant) {
  if (variant === "primary") {
    return { backgroundColor: "#5d5dd8", color: "white" };
  } else if (variant === "secondary") {
    return { backgroundColor: "gray", color: "black" };
  } else if (variant === "danger") {
    return { backgroundColor: "red", color: "white" };
  } else if (variant === "warning") {
    return { backgroundColor: "yellow", color: "white" };
  } else if (variant === "success") {
    return { backgroundColor: "green", color: "white" };
  } else if (variant === "Btn-1") {
    return { backgroundColor: "#374151", color: "white" };
  } else if (variant === "success") {
    return { backgroundColor: "green", color: "white" };
  } else if (variant === "success") {
    return { backgroundColor: "green", color: "white" };
  }
}
