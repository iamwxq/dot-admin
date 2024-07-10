import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { UserInfo } from "#/entity/user";
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
    age: 0,
    phone: "",
    email: "",
    username: "",
    gender: GenderEnum.Unknown,
  },
};

export const useGlobalStore = create<State & Action>()(
  persist(
    immer(set => ({
      ...initialState,

      setUser: (user: State["user"]) => set(() => ({ user })),
      setToken: (token: State["token"]) => set(() => ({ token })),

      reset: () => set(() => initialState),
    })),
    {
      name: "cmp-global",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
