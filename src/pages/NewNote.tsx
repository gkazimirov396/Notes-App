import type { FC } from 'react';

import { Typography } from 'antd';

import NoteForm from '../components/NoteForm';

import { useNotesStore } from '../store/note';

const NewNote: FC = () => {
  const createNote = useNotesStore(state => state.createNote);

  return (
    <section className="max-w-4xl">
      <Typography.Title level={3} className="mb-4">
        New Note
      </Typography.Title>

      <NoteForm onSubmit={createNote} />
    </section>
  );
};

export default NewNote;
