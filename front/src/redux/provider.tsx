import { store } from "./store";
import { Provider } from "react-redux";
import { ReactNode } from 'react';

interface ProvidersProps {
    children: ReactNode;
}

export function Providers ({ children }: ProvidersProps){
    return <Provider store={store}>{children}</Provider>
}