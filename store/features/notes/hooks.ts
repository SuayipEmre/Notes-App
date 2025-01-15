import { RootState } from '@/store/app/store'
import{useSelector} from 'react-redux'

export const useNoteTitle = () => useSelector((state : RootState) => state.notes.title)
export const useNoteValue = () => useSelector((state : RootState) => state.notes.note)
export const useIsModalOpen = () => useSelector((state : RootState) => state.notes.isModalOpen)
export const useNoteCategory = () => useSelector((state : RootState) => state.notes.category)