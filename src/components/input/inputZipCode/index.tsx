import {ForwardedRef, forwardRef, InputHTMLAttributes} from "react";
import {FieldError} from "react-hook-form";
import InputMask, {ReactInputMask} from "react-input-mask";
import {viaCep} from "../../../services/viaCep";
import {OptionalIViaCep} from "../../form/registerClientForm";

interface IInputPhoneProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputWidth: string;
  error?: FieldError;
  setAddress: React.Dispatch<React.SetStateAction<OptionalIViaCep | null>>;
}

export const InputZipCode = forwardRef(({label, inputWidth, setAddress, error, ...rest}: IInputPhoneProps, ref: ForwardedRef<ReactInputMask>) => {
  const classes = `flex flex-col ${inputWidth} bg-zinc-300`;

  const searchZipCode = async (e: React.FocusEvent<HTMLInputElement>) => {
    const formatedZipCode = e.target.value.replace(/-/g, "");
    const {data} = await viaCep.get(`/${formatedZipCode}/json`);

    if (data) setAddress(data);
  };

  return (
    <div className={classes}>
      <div className="flex justify-between items-center">
        {label ? <label htmlFor={rest.id}>{label}</label> : null}
        <InputMask
          ref={ref}
          mask={"99999-999"}
          alwaysShowMask={false}
          maskChar={null}
          type="tel"
          {...rest}
          onBlur={(e) => {
            searchZipCode(e);
          }}
        />
      </div>
      {error ? <p className="text-xs text-red-600 mt-1 h-8">{error.message}</p> : <p className="block h-8"></p>}
    </div>
  );
});
