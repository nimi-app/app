import { ReactNode } from 'react';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { AppWrapper } from '../modules/app-wrapper';

export function LoggedInWrapper({ children }: { children: ReactNode }) {
  return (
    <AppWrapper header={<Header />} footer={<Footer />}>
      {children}
    </AppWrapper>
  );
}
