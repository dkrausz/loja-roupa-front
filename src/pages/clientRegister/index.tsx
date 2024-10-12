import {RegisterClientForm} from "../../components/form/registerClientForm";
import {TemplatePage} from "../Template";

export function ClientRegister() {
  return (
    <>
      <TemplatePage>
        <h1 className="text-center">RegisterPage</h1>

        <RegisterClientForm />
      </TemplatePage>
    </>
  );
}
