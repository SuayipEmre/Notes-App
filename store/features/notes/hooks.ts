import { RootState } from '@/store/app/store'
import{useSelector} from 'react-redux'

export const useNoteTitle = () => useSelector((state : RootState) => state.notes.title)
export const useNoteValue = () => useSelector((state : RootState) => state.notes.text)
export const useIsModalOpen = () => useSelector((state : RootState) => state.notes.isModalOpen)
export const useNoteCategory = () => useSelector((state : RootState) => state.notes.category)
export const useNotes = () => useSelector((state : RootState) => state.notes.notes)
export const useCategories = () => useSelector((state : RootState) => state.notes.categories)