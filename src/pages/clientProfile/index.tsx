import {useContext} from "react";
import {TemplatePage} from "../Template";
import {ClientContext} from "../../providers/clientContext";
import {ClientProfileForm} from "../../components/form/clientProfileForm";

export function ClientProfile() {
  const {activeClient} = useContext(ClientContext);
  return (
    <>
      <TemplatePage>
        <h1 className="text-center text-4xl my-12 text-zinc-950">Suas Informações</h1>
        <ClientProfileForm client={activeClient ? activeClient : undefined} />
      </TemplatePage>
    </>
  );
}
