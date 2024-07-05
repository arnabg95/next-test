import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  blurMatured: boolean;
  postInNewTab: boolean;
};

type Action = {
  updateSettings: (key: "blurMatured" | "postInNewTab", value: boolean) => void;
  resetState: () => void;
};

export const useSettingsStore = create(
  persist<State & Action>(
    (set) => ({
      blurMatured: false,
      postInNewTab: false,
      updateSettings: (key, value) => {
        if (key == "blurMatured") set({ blurMatured: value });
        else if (key == "postInNewTab") set({ postInNewTab: value });
      },
      resetState: () => {
        set({ blurMatured: false, postInNewTab: false });
      },
    }),
    {
      name: "user-settings-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useSettingsStore;
