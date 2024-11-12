import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { INoteData, IRawNote } from '../types/note';

interface NoteStore {
  notes: IRawNote[];
  createNote: (newNote: INoteData) => void;
  updateNote: (id: string, note: INoteData) => void;
  deleteNote: (id: string) => void;
}

export const useNotesStore = create<NoteStore>()(
  persist(
    set => ({
      notes: [],
      createNote: ({ tags, ...noteData }) => {
        const newNote = {
          ...noteData,
          id: uuid(),
          tagIds: tags.map(tag => tag.id),
        };

        set(state => ({ notes: [...state.notes, newNote] }));
      },
      updateNote: (id, { tags, ...noteData }) =>
        set(state => ({
          notes: state.notes.map(note => {
            return note.id === id
              ? { ...note, ...noteData, tagIds: tags.map(tag => tag.id) }
              : note;
          }),
        })),
      deleteNote: id =>
        set(state => ({ notes: state.notes.filter(note => note.id !== id) })),
    }),
    { name: 'NOTES', version: 1 }
  )
);
