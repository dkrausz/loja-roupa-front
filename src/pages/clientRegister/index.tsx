import {RegisterClientForm} from "../../components/form/registerClientForm";
import {TemplatePage} from "../Template";

export function ClientRegister() {
  return (
    <>
      <TemplatePage>
        <h1 className="text-center m-6 text-3xl font-bold">Cadastre-se</h1>

        <RegisterClientForm />
      </TemplatePage>
    </>
  );
}
