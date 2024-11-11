import { useMemo } from 'react';

import { useNotesStore } from '../store/note';
import { useTagsStore } from '../store/tag';

import type { ISimpleNote } from '../types/note';

export const useNotesWithTags = () => {
  const notes = useNotesStore(state => state.notes);
  const tags = useTagsStore(state => state.tags);

  const notesWithTags = useMemo<ISimpleNote[]>(
    () =>
      notes.map(note => ({
        ...note,
        tags: tags?.filter(tag => note.tagIds.includes(tag.id)),
      })),
    [notes, tags]
  );

  return notesWithTags;
};
