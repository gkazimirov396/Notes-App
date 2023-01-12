import { useMemo } from 'react';
import { useLocalStorage } from 'react-haiku';
import { Navigate, Route, Routes } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import NoteLayout from './components/NoteLayout';
import EditNote from './pages/EditNote';
import NewNote from './pages/NewNote';
import NoteDetailed from './pages/NoteDetailed';
import NoteList from './pages/NoteList';
import type { INoteData, IRawNote, ITag } from './utils/types';

const App = () => {
  const [notes, setNotes] = useLocalStorage<IRawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<ITag[]>('TAGS', []);

  const notesWithTags = useMemo(
    () =>
      notes.map(note => ({
        ...note,
        tags: tags?.filter(tag => note.tagIds.includes(tag.id)),
      })),
    [notes, tags],
  );

  const createNoteHandler = ({ tags, ...data }: INoteData) => {
    setNotes([
      ...notes,
      { ...data, id: uuid(), tagIds: tags.map(tag => tag.id) },
    ]);
  };

  const updateNoteHandler = (id: string, { tags, ...data }: INoteData) => {
    const updatedNotes = notes.map(note => {
      return note.id === id
        ? { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        : note;
    });
    setNotes(updatedNotes);
  };

  const deleteNoteHandler = (id: string) => {
    const filteredNotes = notes.filter(note => note.id !== id);
    setNotes(filteredNotes);
  };

  const addTagHandler = (newTag: ITag) => {
    setTags([...tags, newTag]);
  };

  const updateTagHandler = (id: string, label: string) => {
    const updatedTags = tags.map(tag => {
      return tag.id === id ? { ...tag, label } : tag;
    });
    setTags(updatedTags);
  };

  const deleteTagHandler = (id: string) => {
    const filteredTags = tags.filter(tag => tag.id !== id);
    setTags(filteredTags);
  };

  return (
    <main className="container my-10">
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              availableTags={tags}
              notes={notesWithTags}
              onDeleteTag={deleteTagHandler}
              onUpdateTag={updateTagHandler}
            />
          }
        />
        <Route
          path="/new-note"
          element={
            <NewNote
              onSubmit={createNoteHandler}
              onAddTag={addTagHandler}
              availableTags={tags}
            />
          }
        />
        <Route path="/:noteId" element={<NoteLayout notes={notesWithTags} />}>
          <Route
            index
            element={<NoteDetailed onDeleteNote={deleteNoteHandler} />}
          />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={updateNoteHandler}
                onAddTag={addTagHandler}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
};

export default App;
