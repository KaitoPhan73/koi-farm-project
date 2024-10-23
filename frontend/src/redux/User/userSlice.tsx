import { isClient } from "@/lib/http";
import { TAuthResponse } from "@/schema/auth.schema";
import { TUserResponse } from "@/schema/user.schema";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: TUserResponse | null;
  isAuthenticated: boolean;
}

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("user");
    if (serializedState === null) {
      return {
        user: {},
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      user: {},
    };
  }
};

const initialState: UserState = {
  user: loadState(),
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUser | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    loadUserFromStorage(state) {
      if (isClient()) {
        const storedUser = localStorage.getItem("user");
        state.user = storedUser ? JSON.parse(storedUser) : null;
        state.isAuthenticated = !!state.user;
      }
    },
  },
});

export const { setUser, loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
