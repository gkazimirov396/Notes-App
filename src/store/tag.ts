import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { ITag } from '../types/tag';

interface TagStore {
  tags: ITag[];
  addTag: (newTag: ITag) => void;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
}

export const useTagsStore = create<TagStore>()(
  persist(
    set => ({
      tags: [],
      addTag: newTag => set(state => ({ tags: [...state.tags, newTag] })),
      deleteTag: id =>
        set(state => ({ tags: state.tags.filter(tag => tag.id !== id) })),

      updateTag: (id, label) =>
        set(state => ({
          tags: state.tags.map(tag => {
            return tag.id === id ? { ...tag, label } : tag;
          }),
        })),
    }),
    { name: 'TAGS' }
  )
);
