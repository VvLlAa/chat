import { configureStore } from "@reduxjs/toolkit";
import mainStore from "./MainStore.ts";
import modalStore from "./ModalStore.ts";

export const store = configureStore({
    reducer: {
        auth: mainStore,
        modal: modalStore
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;