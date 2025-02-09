import { createSlice } from "@reduxjs/toolkit";

interface ModalStore {
    showModal: boolean | null;
}

const initialState: ModalStore = {
    showModal: null,
};

const modalStore = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state) => {
            state.showModal = true;
        },
        closeModal: (state) => {
            state.showModal = false;
        },
        toggleModal: (state) => {
            state.showModal = !state.showModal;
        },
    },
});

export const {
    openModal,
    closeModal,
    toggleModal,
} = modalStore.actions;
export default modalStore.reducer;
