import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from 'react-router-dom';

import { useNotesWithTags } from '../hooks/useNotesWithTags';

import { RoutePath } from '../router/path';

import type { INote } from '../types/note';

const NoteLayout = () => {
  const { noteId } = useParams();

  const notes = useNotesWithTags();
  const note = notes.find(n => n.id === noteId);

  return (
    <>
      {!note ? (
        <Navigate to={RoutePath.HOME} replace />
      ) : (
        <Outlet context={note} />
      )}
    </>
  );
};

export const useNote = () => useOutletContext<INote>();

export default NoteLayout;
