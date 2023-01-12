import { Button, Col, Form, Input, Row, Space } from 'antd';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { v4 as uuid } from 'uuid';
import type { INoteData, ITag } from '../utils/types';

interface NoteFormProps extends Partial<INoteData> {
  onSubmit: (data: INoteData) => void;
  onAddTag: (newTag: ITag) => void;
  availableTags: ITag[];
}

interface NoteFormData {
  title: string;
  markdown: string;
}

const NoteForm: FC<NoteFormProps> = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = '',
  tags = [],
  markdown = '',
}) => {
  const [selectedTags, setSelectedTags] = useState<ITag[]>(tags);
  const [form] = Form.useForm<NoteFormData>();
  const navigate = useNavigate();

  const submitHandler = () => {
    const formData = form.getFieldsValue();
    onSubmit({
      ...formData,
      tags: selectedTags,
    });
    navigate(-1);
  };

  return (
    <Form
      onFinish={submitHandler}
      layout="vertical"
      requiredMark={false}
      form={form}
      initialValues={{
        title,
        markdown,
      }}
    >
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'This field cannot be empty!',
              },
            ]}
          >
            <Input className="h-[38px] w-80" size="large" />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Tags">
            <CreatableReactSelect
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
              onCreateOption={label => {
                const newTag = { label, id: uuid() };
                onAddTag(newTag);
                setSelectedTags(prevTags => [...prevTags, newTag]);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="Body"
        name="markdown"
        rules={[
          {
            required: true,
            message: 'This field cannot be empty!',
          },
        ]}
      >
        <Input.TextArea rows={15} />
      </Form.Item>
      <Space size="middle" className="justify-end">
        <Button htmlType="submit" type="primary">
          Save
        </Button>
        <Link to="..">
          <Button>Cancel</Button>
        </Link>
      </Space>
    </Form>
  );
};

export default NoteForm;
