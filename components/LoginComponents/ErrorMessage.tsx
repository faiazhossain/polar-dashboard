import React, { FC } from "react";
interface ErrorMessageProps {
  message: string;
}
const ErrorMessage: FC<ErrorMessageProps> = ({ message }) =>
  message ? <p className="text-red-500 text-sm ml-3">{message}</p> : null;

export default ErrorMessage;
