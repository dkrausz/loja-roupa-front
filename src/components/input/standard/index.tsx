import {ForwardedRef, forwardRef, InputHTMLAttributes} from "react";
import {FieldError} from "react-hook-form";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputWidth: string;
  error?: FieldError;
}
//prettier-ignore
export const Input = forwardRef(({ label,inputWidth, error, ...rest }: IInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  
  const classes = `flex flex-col ${inputWidth} bg-zinc-300`;
  return (
    <div className={classes}>
      <div className="flex justify-between items-center">       
        {label ? <label htmlFor={rest.id} >{label}</label> : null}
        <input ref={ref} {...rest}  />    
      </div>  
        {error ? <p className="text-xs text-red-600 mt-1 h-8">{error.message}</p> : <p className="block h-8"></p>}
    
    </div>
  );
});
