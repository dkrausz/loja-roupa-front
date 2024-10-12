import { ReactNode, useState } from 'react';
import { Header } from '../../components/header';
import { LoginModal } from '../../components/modais/loginModal';
import { Footer } from '../../components/footer';

interface templateProps {
  children: ReactNode;
}

export function TemplatePage({ children }: templateProps) {
  const [ShowLoginModal, SetShowLogintModal] = useState(false);
  return (
    <>
      <Header
        SetShowLogintModal={SetShowLogintModal}
        ShowLoginModal={ShowLoginModal}
      />
      {ShowLoginModal ? (
        <LoginModal SetShowLogintModal={SetShowLogintModal} />
      ) : null}
      {children}
      <Footer />
    </>
  );
}
