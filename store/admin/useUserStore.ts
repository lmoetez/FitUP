import { User } from "types/api";
import create, { State } from "zustand";

interface UserState extends State {
  visible: boolean;
  user: User;

  newUserModal: () => void;
  editUserModal: (user: User) => void;
  hideUserModal: () => void;
}

const useUserStore = create<UserState>((set, get) => ({
  visible: false,
  user: undefined,

  newUserModal: () => set({ visible: true, user: undefined }),
  editUserModal: (user: User) => set({ visible: true, user }),
  hideUserModal: () => set({ visible: false, user: undefined }),
}));

export default useUserStore;
