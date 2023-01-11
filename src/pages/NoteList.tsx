import { Button, Col, Form, Input, Row, Space } from 'antd';
import { FC, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import EditTagsModal from '../components/EditTagsModal';
import type { ISimpleNote, ITag } from '../utils/types';
import NoteCard from './../components/NoteCard';

interface NoteListProps {
  notes: ISimpleNote[];
  availableTags: ITag[];
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
}

const NoteList: FC<NoteListProps> = ({
  availableTags,
  notes,
  onDeleteTag,
  onUpdateTag,
}) => {
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const [title, setTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredNotes = useMemo(
    () =>
      notes.filter(
        note =>
          (title === '' ||
            note.title.toLowerCase().includes(title.toLowerCase())) &&
          (selectedTags.length === 0 ||
            selectedTags.every(tag =>
              note.tags.some(noteTag => noteTag.id === tag.id),
            )),
      ),
    [title, selectedTags, notes],
  );

  return (
    <section className="mx-56 w-full">
      <Row
        gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
        className="mb-4 flex items-center justify-between"
      >
        <Col sm={10} md={8} lg={5} xl={13}>
          <h1 className="text-3xl">Notes</h1>
        </Col>
        <Col sm={10} md={8} lg={9} xl={8}>
          <Space size="small" direction="horizontal">
            <Link to="/new-note">
              <Button type="primary">Create</Button>
            </Link>
            <Button onClick={() => setIsModalOpen(true)}>Edit Tags</Button>
          </Space>
        </Col>
      </Row>

      <Form requiredMark={false} colon={false}>
        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} className="mb-4">
          <Col className="w-auto">
            <Form.Item label="Title" name="title">
              <Input
                className="h-[38px] w-80"
                size="large"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col className="w-max">
            <Form.Item label="Tags" name="tags">
              <ReactSelect
                className="w-80"
                isMulti
                options={availableTags.map(tag => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                value={selectedTags?.map(tag => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={tags => {
                  setSelectedTags(
                    tags.map(tag => ({
                      label: tag.label,
                      id: tag.value,
                    })),
                  );
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {/* className="gap-3" */}
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        {filteredNotes.map(note => (
          <Col xs={1} sm={2} lg={3} xl={5} key={note.id}>
            <NoteCard note={note} />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        onDeleteTag={onDeleteTag}
        onUpdateTag={onUpdateTag}
        availableTags={availableTags}
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default NoteList;
