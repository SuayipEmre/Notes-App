import { PayloadAction, createSlice } from "@reduxjs/toolkit";



type initialStateTypes = {
    isModalOpen : boolean,
    title : string,
    note : string,
    category : string
}
const initialState : initialStateTypes = {
    isModalOpen : false,
    title : '',
    note : '',
    category : ''

}
const noteSlice = createSlice({
    name : 'notes slice',
    initialState,
    reducers : {
        _setIsModalOpen : (state, action:PayloadAction<boolean>) => {
          state.isModalOpen = action.payload
        },

        _setNoteTitle : (state, action : PayloadAction<string>) => {
          state.title = action.payload
        },

        _setNote : (state, action : PayloadAction<string>) => {
          state.note = action.payload
        },
        _setCategory : (state, action : PayloadAction<string>) => {
          state.category = action.payload
        }
    }
})




export const{_setIsModalOpen, _setNote, _setNoteTitle, _setCategory} = noteSlice.actions
export default noteSlice.reducer