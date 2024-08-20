import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { UserInfo } from "#/entities/user";
import { GenderEnum } from "#/enums/entity";

interface State {
  token: {
    access: string;
    refresh: string;
  };
  user: UserInfo;
}

interface Action {
  setToken: (token: State["token"]) => void;
  setUser: (user: UserInfo) => void;
  reset: () => void;
}

const initialState: State = {
  token: {
    access: "",
    refresh: "",
  },
  user: {
    id: "",
    age: 0,
    phone: "",
    email: "",
    username: "",
    gender: GenderEnum.UNKNOWN,
  },
};

export const useGlobalStore = create<State & Action>()(
  immer(set => ({
    ...initialState,

    setUser: (user: State["user"]) => set(() => ({ user })),
    setToken: (token: State["token"]) => set(() => ({ token })),

    reset: () => set(() => initialState),
  })),
);
