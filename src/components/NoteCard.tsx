import { Card, Space, Tag, Typography } from 'antd';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { ISimpleNote } from '../utils/types';

import classes from './NoteCard.module.css';

const NoteCard: FC<{ note: ISimpleNote }> = ({ note }) => {
  return (
    <Link to={`/${note.id}`}>
      <Card className={classes.card}>
        <Space
          direction="vertical"
          align="center"
          className="flex h-full justify-center"
        >
          <Typography.Title level={5}>{note.title}</Typography.Title>
          {note.tags.length > 0 && (
            <Space wrap align="center" className="flex justify-center">
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
        </Space>
      </Card>
    </Link>
  );
};

export default NoteCard;
