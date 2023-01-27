import { Group } from "types/api";
import create, { State } from "zustand";

interface GroupState extends State {
  visible: boolean;
  group: Group;

  newGroupModal: () => void;
  editGroupModal: (group: Group) => void;
  hideGroupModal: () => void;
}

const useGroupStore = create<GroupState>((set, get) => ({
  visible: false,
  group: undefined,

  newGroupModal: () => set({ visible: true, group: undefined }),
  editGroupModal: (group: Group) => set({ visible: true, group }),
  hideGroupModal: () => set({ visible: false, group: undefined }),
}));

export default useGroupStore;
