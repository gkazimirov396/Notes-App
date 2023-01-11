import { Card, Space, Tag } from 'antd';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { ISimpleNote } from '../utils/types';

import classes from './NoteCard.module.css';

interface NoteCardProps {
  note: ISimpleNote;
}

const NoteCard: FC<NoteCardProps> = ({ note }) => {
  return (
    <Link to={`/${note.id}`}>
      <Card className={`decoration-none h-full ${classes.card}`}>
        <Space
          size="small"
          className="flex h-full flex-col items-center justify-center"
        >
          <span className="text-lg">{note.title}</span>
          {note.tags.length > 0 && (
            <Space
              size="small"
              direction="horizontal"
              className="flex flex-wrap items-center justify-center"
            >
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
        </Space>
      </Card>
    </Link>
  );
};

export default NoteCard;
