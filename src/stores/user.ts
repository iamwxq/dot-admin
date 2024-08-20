import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { getItem, setItem } from "@/utils/storage";
import { StorageEnum } from "#/enums/utils";
import type { UserInfo, UserToken } from "#/entities/user";

interface State {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
};

interface Action {
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (token: UserToken) => void;
    reset: () => void;
    clear: () => void;
  };
};

const initialState: State = {
  userInfo: getItem<UserInfo>(StorageEnum.USER) || {},
  userToken: getItem<UserToken>(StorageEnum.TOKEN) || {},
};

export const useUserStore = create<State & Action>()(
  immer(set => ({
    ...initialState,

    actions: {
      setUserToken: (userToken) => {
        set({ userToken });
        setItem(StorageEnum.TOKEN, userToken);
      },

      setUserInfo: (userInfo) => {
        set({ userInfo });
        setItem(StorageEnum.USER, userInfo);
      },

      reset: () => set(() => initialState),

      clear: () => set({ userInfo: {}, userToken: {} }),
    },
  })),
);

export const useUserInfo = () => useUserStore(state => state.userInfo);
export const useUserToken = () => useUserStore(state => state.userToken);
export const useUserPermission = () => useUserStore(state => state.userInfo.permission);
export const useUserActions = () => useUserStore(state => state.actions);
