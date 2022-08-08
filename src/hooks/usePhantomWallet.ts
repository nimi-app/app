import { AppDispatch } from '../state';
import { useDispatch } from 'react-redux';
import { setPhantomWallet } from '../state/application/actions';

declare global {
  interface Window {
    solana: any;
  }
}

export function usePhantomWallet() {
  const dispatch = useDispatch<AppDispatch>();

  async function connectPhantomWallet(onlyIfTrusted = true) {
    try {
      if ('solana' in window) {
      }
      const win: typeof global = window;
      const solana = win.solana;
      console.log('inside', solana);
      if (solana?.isPhantom) {
        const response = onlyIfTrusted ? await solana.connect({ onlyIfTrusted: true }) : await solana.connect();

        dispatch(setPhantomWallet(response));
      } else {
        dispatch(setPhantomWallet(null));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return {
    connectPhantomWallet,
  };
}
