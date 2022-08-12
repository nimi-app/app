import { useLocalStorage } from '@solana/wallet-adapter-react';
import type { FC, ReactNode } from 'react';
import { createContext, useContext } from 'react';

export enum ActiveNetworkState {
  SOLANA,
  ETHEREUM,
  DEFAULT,
}

export interface ActiveNetworkContextState {
  activeNetwork: ActiveNetworkState;
  setActiveNetwork(activeNetwork: ActiveNetworkState): void;
}

export const ActiveNetworkContext = createContext<ActiveNetworkContextState>({} as ActiveNetworkContextState);

export function useActiveNetwork(): ActiveNetworkContextState {
  return useContext(ActiveNetworkContext);
}

export const ActiveNetworkProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [activeNetwork, setActiveNetwork] = useLocalStorage('autoConnect', ActiveNetworkState.DEFAULT);

  return (
    <ActiveNetworkContext.Provider value={{ activeNetwork, setActiveNetwork }}>
      {children}
    </ActiveNetworkContext.Provider>
  );
};
