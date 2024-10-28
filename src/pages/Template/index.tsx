import {ReactNode, useContext} from "react";
import {Header} from "../../components/header";
import {Footer} from "../../components/footer";
import {ControllerContext} from "../../providers/controllerContext";
import {TemplateModal} from "../../components/modais/templateModal";

interface templateProps {
  children: ReactNode;
}

export function TemplatePage({children}: templateProps) {
  const {showTemplateModal} = useContext(ControllerContext);
  return (
    <>
      <Header />
      {showTemplateModal ? <TemplateModal /> : null}
      {children}
      <Footer />
    </>
  );
}
