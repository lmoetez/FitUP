import { ClassType } from "types/api";
import create, { State } from "zustand";

interface ClassState extends State {
  visible: boolean;
  _class: ClassType;

  newClassModal: () => void;
  editClassModal: (_class: ClassType) => void;
  hideClassModal: () => void;
}

const useClassStore = create<ClassState>((set, get) => ({
  visible: false,
  _class: undefined,

  newClassModal: () => set({ visible: true, _class: undefined }),
  editClassModal: (_class: ClassType) => set({ visible: true, _class }),
  hideClassModal: () => set({ visible: false, _class: undefined }),
}));

export default useClassStore;
