import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { AppWrapper } from '../modules/app-wrapper';
import { NimiConnectPage } from '../modules/nimi-connect';

export function ConnectPage() {
  return (
    <AppWrapper header={<Header />} footer={<Footer />}>
      <NimiConnectPage />
    </AppWrapper>
  );
}
