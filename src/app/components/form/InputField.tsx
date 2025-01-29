import { forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

export type FormFieldProps = {
  error: FieldError | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

// eslint-disable-next-line react/display-name
const InputField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ error, ...props }, ref) => (
    <>
      <input ref={ref} {...props} value={props.value || ""} />
      {error && (
        <span className="text-sm text-red-300 error-message">
          {error.message}
        </span>
      )}
    </>
  ),
);

export default InputField;
