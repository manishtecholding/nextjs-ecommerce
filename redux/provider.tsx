'use client';
    
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from 'redux-persist/integration/react';

const Providers = ({
    children
}: {
    children: any
}) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default Providers;