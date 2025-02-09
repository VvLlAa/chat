import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessageType {
    text: string;
    time: string;
    isOutgoing: boolean;
}

export interface UserStore {
    number: string;
    messages: MessageType[];
}

interface AuthState {
    idInstance: string;
    apiTokenInstance: string;
    users: UserStore[];
    selectedUser: UserStore | null,
}

const initialState: AuthState = {
    idInstance: "",
    apiTokenInstance: "",
    users: [],
    selectedUser: null,
};

const mainStore = createSlice({
    name: "auth",
    initialState,
    reducers: {
        selectUser: (state, action: PayloadAction<UserStore>) => {
            state.selectedUser = action.payload;
        },
        addNewUser: (state, action: PayloadAction<UserStore>) => {
            state.users.push(action.payload);
        },
        addMessage: (state, action: PayloadAction<MessageType>) => {
                const user = state.users.find((user) => user.number === state.selectedUser?.number);
                if (user) {
                    user.messages.push(action.payload);
                }
        },
        getMessage: (state, action: PayloadAction<{ number: string; message: MessageType }>) => {
            state.users = state.users.map(user =>
                user.number === action.payload.number
                    ? { ...user, messages: [...user.messages, action.payload.message] }
                    : user
            );

            if (state.selectedUser?.number === action.payload.number) {
                state.selectedUser.messages.push(action.payload.message);
            }
        },

        setAuthData: (state, action: PayloadAction<AuthState>) => {
            state.idInstance = action.payload.idInstance;
            state.apiTokenInstance = action.payload.apiTokenInstance;
        },
        clearAuthData: (state) => {
            state.idInstance = "";
            state.apiTokenInstance = "";
        },
    },
});

export const {
    setAuthData,
    clearAuthData,
    addNewUser,
    selectUser,
    addMessage,
    getMessage
} = mainStore.actions;
export default mainStore.reducer;