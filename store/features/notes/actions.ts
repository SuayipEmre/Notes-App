import store from "@/store/app/store";
import { _setCategory, _setIsModalOpen, _setNote, _setNoteTitle } from ".";

export const setIsModalOpen = (value : boolean) => store.dispatch(_setIsModalOpen(value))
export const setNoteTitle = (value : string) => store.dispatch(_setNoteTitle(value))
export const setNoteValue = (value : string) => store.dispatch(_setNote(value))
export const setNoteCategory = (value : string) => store.dispatch(_setCategory(value))