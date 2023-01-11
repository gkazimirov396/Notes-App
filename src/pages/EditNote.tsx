import type { FC } from 'react';
import type { INoteData, ITag } from '../utils/types';
import NoteForm from './../components/NoteForm';
import { useNote } from './../components/NoteLayout';

interface EditNoteProps {
  onSubmit: (id: string, data: INoteData) => void;
  onAddTag: (newTag: ITag) => void;
  availableTags: ITag[];
}

const EditNote: FC<EditNoteProps> = ({ onSubmit, availableTags, onAddTag }) => {
  const note = useNote();

  return (
    <section className="mx-14 w-full">
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onAddTag={onAddTag}
        availableTags={availableTags}
        onSubmit={data => onSubmit(note.id, data)}
      />
    </section>
  );
};

export default EditNote;
