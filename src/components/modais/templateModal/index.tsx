import {useContext, useEffect, useRef} from "react";
import {ControllerContext} from "../../../providers/controllerContext";
import {ClientContext} from "../../../providers/clientContext";
import {LoginModal} from "../loginModal";
import {ClientModal} from "../clientModal";

export function TemplateModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const {setShowTemplateModal} = useContext(ControllerContext);
  const {activeClient} = useContext(ClientContext);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!modalRef.current?.contains(event.target as Node)) {
        setShowTemplateModal(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowTemplateModal(false);
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
    <div role="dialog" className="h-64 w-96 bg-neutral-300  absolute right-0 top-24" ref={modalRef}>
      {activeClient ? <ClientModal /> : <LoginModal />}
    </div>
  );
}
