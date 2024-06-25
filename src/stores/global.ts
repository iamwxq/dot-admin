import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { createSelectors } from ".";

interface State {
  layout: "horizontal" | "vertical";
}

interface Action {
  switchLayout: (layout: State["layout"]) => void;
  reset: () => void;
}

const initialState: State = {
  layout: "vertical",
};

export const useGlobalStore = createSelectors(create<State & Action>()(
  immer(set => ({
    ...initialState,

    switchLayout: (layout: State["layout"]) => set(() => ({ layout })),

    reset: () => set(() => initialState),
  })),
));
