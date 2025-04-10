import { create } from "zustand";

const usePhonebookStore = create((set)=>({
    phoneBook: [],
    addContact: (name, phoneNumber, photo) => 
        set((state)=>({
            phoneBook: [...state.phoneBook, {id:Date.now(), name, phoneNumber, photo}]
    }))
}))

export default usePhonebookStore;