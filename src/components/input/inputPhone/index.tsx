import {ForwardedRef, forwardRef, InputHTMLAttributes} from "react";
import {FieldError} from "react-hook-form";
import InputMask, {ReactInputMask} from "react-input-mask";

interface IInputPhoneProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputWidth: string;
  error?: FieldError;
}

export const InputPhone = forwardRef(({label, inputWidth, error, ...rest}: IInputPhoneProps, ref: ForwardedRef<ReactInputMask>) => {
  const classes = `flex flex-col ${inputWidth} bg-zinc-300`;

  return (
    <div className={classes}>
      <div className="flex justify-between items-center">
        {label ? <label htmlFor={rest.id}>{label}</label> : null}
        <InputMask ref={ref} mask={"(99)99999-9999"} alwaysShowMask={false} maskChar={null} type="tel" {...rest} />
      </div>
      {error ? <p className="text-xs text-red-600 mt-1 h-8">{error.message}</p> : <p className="block h-8"></p>}
    </div>
  );
});
