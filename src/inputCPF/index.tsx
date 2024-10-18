import {ChangeEvent, ForwardedRef, forwardRef, InputHTMLAttributes} from "react";
import {FieldError} from "react-hook-form";

interface IInpuCPFProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputWidth: string;
  error?: FieldError;
}

let backspace = false;

function isBackSpace(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key == "Backspace") {
    backspace = true;
  } else {
    backspace = false;
  }
}

function CPFMask(e: ChangeEvent<HTMLInputElement>) {
  if (!backspace) {
    let v: string = e.target.value;
    const lastCharacterIsANumber = Number(v[v.length - 1]);

    if (isNaN(lastCharacterIsANumber) || v.length > 14) {
      v = v.substring(0, v.length - 1);
    }

    if (v.length == 3 || v.length == 7) v += ".";
    if (v.length == 11) v += "-";
    e.target.value = v;
  }
}

//prettier-ignore
export const InputCPF = forwardRef(({ label,inputWidth, error, ...rest }: IInpuCPFProps, ref: ForwardedRef<HTMLInputElement>) => {
  
  const classes = `flex flex-col ${inputWidth} bg-zinc-200`;

  return (
    <div className={classes}>
      <div className="flex justify-between items-center">       
        {label ? <label htmlFor={rest.id} >{label}</label> : null}
        <input ref={ref}{...rest}onChange={(e) => CPFMask(e)} onKeyDown={(e)=> isBackSpace(e)} />    
      </div>  
        {error ? <p className="text-xs text-red-600 mt-1 h-8">{error.message}</p> : <p className="block h-8"></p>}
    
    </div>
  );
});
