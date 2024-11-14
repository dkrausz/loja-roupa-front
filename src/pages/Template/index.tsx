import {ReactNode, useContext} from "react";
import {Header} from "../../components/header";
import {Footer} from "../../components/footer";
import {ControllerContext} from "../../providers/controllerContext";
import {TemplateModal} from "../../components/modais/templateModal";
import {Loading} from "../../components/loading";

interface templateProps {
  children: ReactNode;
}

export function TemplatePage({children}: templateProps) {
  const {showTemplateModal, isLoading} = useContext(ControllerContext);

  return (
    <>
      <Header />
      {isLoading ? <Loading /> : null}

      {showTemplateModal ? <TemplateModal /> : null}
      {children}
      <Footer />
    </>
  );
}
