import {useContext, useEffect} from "react";
import {RegisterClientForm} from "../../components/form/registerClientForm";
import {TemplatePage} from "../Template";
import {ControllerContext} from "../../providers/controllerContext";

export function ClientRegister() {
  const {setShowTemplateModal} = useContext(ControllerContext);
  useEffect(() => {
    setShowTemplateModal(false);
  }, []);

  return (
    <>
      <TemplatePage>
        <h1 className="text-center m-6 text-3xl font-bold">Cadastre-se</h1>

        <RegisterClientForm />
      </TemplatePage>
    </>
  );
}
