import type { FC } from 'react';
import type { INoteData, ITag } from '../utils/types';
import NoteForm from './../components/NoteForm';

interface NewNoteProps {
  onSubmit: (data: INoteData) => void;
  onAddTag: (newTag: ITag) => void;
  availableTags: ITag[];
}

const NewNote: FC<NewNoteProps> = ({ onSubmit, availableTags, onAddTag }) => {
  return (
    <section className="mx-14 w-full">
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        onAddTag={onAddTag}
        availableTags={availableTags}
        onSubmit={onSubmit}
      />
    </section>
  );
};

export default NewNote;
