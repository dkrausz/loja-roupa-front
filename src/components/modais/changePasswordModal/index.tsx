import {zodResolver} from "@hookform/resolvers/zod";
import {InputPassword} from "../../input/inputPassword";
import {useForm, handleSubmit, SubmitHandler} from "react-hook-form";
import {changePasswordSchema, TChangePassword} from "../../form/registerClientForm/schema";
import {useEffect, useRef} from "react";

interface IChangePasswordModalProps {
  setPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ChangePasswordModal({setPasswordModal}: IChangePasswordModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<TChangePassword>({
    resolver: zodResolver(changePasswordSchema),
  });

  const submit: SubmitHandler<TChangePassword> = async (formData) => {
    console.log(formData);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!modalRef.current?.contains(event.target as Node)) {
        setPasswordModal(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPasswordModal(false);
      }
    };

    window.addEventListener("mousedown", handleClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div role="dialog" className="w-full h-screen bg-gray-950/[0.8] inset-0 fixed flex justify-center items-center">
      <div className="w-2/5 bg-slate-100 relative h-80 p-12 rounded-lg" ref={modalRef}>
        <button className="border-2 border-slate-950	w-6 rounded absolute right-4 top-4" onClick={() => setPasswordModal(false)}>
          X
        </button>
        <form>
          <InputPassword
            inputWidth="w-11/12"
            label="Digite sua senha atual"
            id={"oldPassword"}
            placeholder="Digite sua senha"
            className="w-64 rounded-md h-8"
            error={errors.confirmPwd}
            {...register("oldPassword")}
          />
          <InputPassword
            inputWidth="w-11/12"
            label="Digite sua nova senha"
            id={"password"}
            placeholder="Digite sua nova senha"
            className="w-64 rounded-md h-8"
            error={errors.confirmPwd}
            {...register("password")}
          />
          <InputPassword
            inputWidth="w-11/12"
            label="Digite novamente sua senha"
            id={"confirmPwd"}
            placeholder="Confirme sua senha"
            className="w-64 rounded-md h-8"
            error={errors.confirmPwd}
            {...register("confirmPwd")}
          />
          <button type="" className="w-11/12 h-8 bg-blue-500 rounded-xl text-zinc-200">
            Alterar
          </button>
        </form>
      </div>
    </div>
  );
}
