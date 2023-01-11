import { Button, Col, Row, Space, Tag } from 'antd';
import type { FC } from 'react';
import ReactMarkDown from 'react-markdown';
import { Link } from 'react-router-dom';
import { useNote } from './../components/NoteLayout';

interface NoteDetailedProps {
  onDeleteNote: (id: string) => void;
}

const NoteDetailed: FC<NoteDetailedProps> = ({ onDeleteNote }) => {
  const note = useNote();

  return (
    <section className="mx-14 w-full">
      <Row
        gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}
        className="mb-4 items-center justify-between"
      >
        <Col sm={10} md={8} lg={9} xl={8}>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Space size="small" direction="horizontal" wrap>
              {note.tags.map(tag => (
                <Tag
                  color="#108ee9"
                  key={tag.id}
                  className="text-ellipsis whitespace-nowrap"
                >
                  {tag.label}
                </Tag>
              ))}
            </Space>
          )}
        </Col>
        <Col xs={4} sm={10} md={8} lg={9} xl={8}>
          <Space size={8} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button type="primary">Edit</Button>
            </Link>
            <Button danger onClick={() => onDeleteNote(note.id)}>
              Delete
            </Button>
            <Link to="/">
              <Button>Go Back</Button>
            </Link>
          </Space>
        </Col>
      </Row>
      <ReactMarkDown>{note.markdown}</ReactMarkDown>
    </section>
  );
};

export default NoteDetailed;
