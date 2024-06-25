import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { createSelectors } from ".";

interface State {};

interface Action {};

const initialState: State = {};

export const useUserStore = createSelectors(create<State & Action>()(
  immer(set => ({
    ...initialState,

    reset: () => set(() => initialState),
  })),
));
