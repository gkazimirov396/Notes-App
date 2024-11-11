import type { FC } from 'react';

import { Button, Col, Row, Space, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { useNote } from '../components/NoteLayout';

import { useNotesStore } from '../store/note';

const NoteDetailed: FC = () => {
  const note = useNote();

  const deleteNote = useNotesStore(state => state.deleteNote);

  return (
    <section>
      <Row
        gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
        className="mb-4 items-center justify-between"
      >
        <Col sm={10} md={6} lg={7} xl={8}>
          <Typography.Title level={3}>{note.title}</Typography.Title>

          {note.tags.length > 0 && (
            <Space wrap>
              {note.tags.map(tag => (
                <Tag
                  key={tag.id}
                  color="#108ee9"
                  className="text-ellipsis whitespace-nowrap"
                >
                  {tag.label}
                </Tag>
              ))}
            </Space>
          )}
        </Col>

        <Col xs={12} sm={2} md={6} lg={7} xl={8}>
          <Space>
            <Link to={`/${note.id}/edit`}>
              <Button type="primary">Edit</Button>
            </Link>

            <Button danger onClick={() => deleteNote(note.id)}>
              Delete
            </Button>

            <Link to="..">
              <Button>Go Back</Button>
            </Link>
          </Space>
        </Col>
      </Row>

      <Typography.Paragraph strong>{note.markdown}</Typography.Paragraph>
    </section>
  );
};

export default NoteDetailed;
