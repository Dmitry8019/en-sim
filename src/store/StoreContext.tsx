import { createContext, ReactNode, useContext } from 'react';

import store from './Store';

export const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }: { children: ReactNode }) => (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);
