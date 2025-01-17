import { PayloadAction, createSlice } from "@reduxjs/toolkit";



type initialStateTypes = {
  isModalOpen: boolean,
  title: string,
  text: string,
  category: string
  notes: note[] | null,
  categories: category[] | null
}
const initialState: initialStateTypes = {
  isModalOpen: false,
  title: '',
  text: '',
  category: '',
  notes: null,
  categories: null


}


const getUniqueCategories = (notes: note[]): { title: string; amount: number }[] => {
  return notes.reduce((acc: { title: string; amount: number }[], note) => {
    const existingCategory = acc.find(item => item.title === note.category);

    if (existingCategory) {
      existingCategory.amount += 1;
    } else {
      acc.push({ title: note.category, amount: 1 });
    }

    return acc;
  }, []);
}


const noteSlice = createSlice({
  name: 'notes slice',
  initialState,
  reducers: {
    _setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload
    },

    _setNoteTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },

    _setNoteText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
    _setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
    _setNotes: (state, action: PayloadAction<note[]>) => {
      state.notes = action.payload
      const categories = getUniqueCategories(action.payload)
      state.categories = categories
    },
    
  }
})




export const { _setIsModalOpen, _setNoteText, _setNoteTitle, _setCategory, _setNotes } = noteSlice.actions
export default noteSlice.reducer