import store from "@/store/app/store";
import {  _setCategory, _setIsModalOpen, _setNoteText, _setNoteTitle, _setNotes } from ".";

export const setIsModalOpen = (value : boolean) => store.dispatch(_setIsModalOpen(value))
export const setNoteTitle = (value : string) => store.dispatch(_setNoteTitle(value))
export const setNoteValue = (value : string) => store.dispatch(_setNoteText(value))
export const setNoteCategory = (value : string) => store.dispatch(_setCategory(value))
export const setNotes = (notes : note[]) => store.dispatch(_setNotes(notes))