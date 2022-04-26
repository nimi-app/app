import { FC, PropsWithChildren } from 'react';

export const WithHeader: FC<PropsWithChildren<{}>> = ({ children }) => (
  <div>
    <h1>Layout 1</h1>
    {children}
  </div>
);
