import {useContext, useEffect} from "react";
import {TemplatePage} from "../Template";
import {ClientContext} from "../../providers/clientContext";
import {ClientProfileForm} from "../../components/form/clientProfileForm";
import {ControllerContext} from "../../providers/controllerContext";

export function ClientProfile() {
  const {activeClient} = useContext(ClientContext);
  const {setShowTemplateModal} = useContext(ControllerContext);

  useEffect(() => {
    setShowTemplateModal(false);
  }, []);

  return (
    <>
      <TemplatePage>
        <h1 className="text-center text-4xl my-12 text-zinc-950">Suas Informações</h1>
        <ClientProfileForm client={activeClient ? activeClient : undefined} />
      </TemplatePage>
    </>
  );
}
