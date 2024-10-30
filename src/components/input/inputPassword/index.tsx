import {ForwardedRef, forwardRef, InputHTMLAttributes, useState} from "react";
import {FieldError} from "react-hook-form";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";

interface IInputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputWidth: string;
  error?: FieldError;
}

export const InputPassword = forwardRef(({label, inputWidth, error, ...rest}: IInputPasswordProps, ref: ForwardedRef<HTMLInputElement>) => {
  const classes = `flex flex-col ${inputWidth} `;
  const inputClasses = rest?.className;
  let inputValues = "";

  if (inputClasses) {
    const regex = /w-/;
    const index = inputClasses.search(regex);
    const size = Number(inputClasses[index + 2] + inputClasses[index + 3]);
    const adjustedSize = (size - 4).toString();
    inputValues = `w-${adjustedSize.toString()} focus-visible:outline-none`;
  }
  const divValues = `${inputClasses} flex items-center bg-white focus-within:outline outline-2`;

  const [visible, setVisible] = useState(false);
  return (
    <div className={classes}>
      <div className="flex justify-between items-center">
        {label ? <label htmlFor={rest.id}>{label}</label> : null}
        <div className={divValues}>
          <input ref={ref} {...rest} className={inputValues} type={visible ? "text" : "password"} />
          {visible ? (
            <FaRegEyeSlash onClick={() => setVisible(false)} className="mr-1 cursor-pointer" />
          ) : (
            <FaRegEye onClick={() => setVisible(true)} className="mr-1 cursor-pointer" />
          )}
        </div>
      </div>
      {error ? <p className="text-xs text-red-600 mt-1 h-8">{error.message}</p> : <p className="block h-8"></p>}
    </div>
  );
});
//"w-64 rounded-md h-8"
