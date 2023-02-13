import type { FC } from 'react';
import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from 'react-router-dom';

import type { INote } from '../utils/types';

const NoteLayout: FC<{ notes: INote[] }> = ({ notes }) => {
  const { noteId } = useParams();
  const note = notes.find(n => n.id === noteId);

  return <>{!note ? <Navigate to="/" replace /> : <Outlet context={note} />}</>;
};

export const useNote = () => useOutletContext<INote>();

export default NoteLayout;
