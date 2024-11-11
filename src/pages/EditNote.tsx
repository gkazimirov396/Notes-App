import type { FC } from 'react';

import { Typography } from 'antd';

import NoteForm from '../components/NoteForm';
import { useNote } from '../components/NoteLayout';

import { useNotesStore } from '../store/note';

const EditNote: FC = () => {
  const note = useNote();

  const updateNote = useNotesStore(state => state.updateNote);

  return (
    <section className="max-w-4xl">
      <Typography.Title level={3} className="mb-4">
        Edit Note
      </Typography.Title>

      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={data => updateNote(note.id, data)}
      />
    </section>
  );
};

export default EditNote;
