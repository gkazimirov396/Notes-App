import { Typography } from 'antd';
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
    <section className="max-w-4xl">
      <Typography.Title level={3} className="mb-4">
        Edit Note
      </Typography.Title>
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
