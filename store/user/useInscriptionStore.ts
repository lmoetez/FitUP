import { ClassType } from "types/api";
import create, { State } from "zustand";

interface InscriptionState extends State {
  visible: boolean;
  _class: ClassType;

  showGroupsModal: (_class: ClassType) => void;
  hideModal: () => void;
}

const useInscriptionStore = create<InscriptionState>((set, get) => ({
  visible: false,
  _class: undefined,

  showGroupsModal: (_class: ClassType) => set({ visible: true, _class }),
  hideModal: () => set({ visible: false, _class: undefined }),
}));

export default useInscriptionStore;
