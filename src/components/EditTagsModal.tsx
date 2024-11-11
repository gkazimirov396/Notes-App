import type { FC } from 'react';

import { Button, Col, Input, Modal, Row, Space } from 'antd';

import { useTagsStore } from '../store/tag';

interface EditTagsModalProps {
  show: boolean;
  onHide: () => void;
}

const EditTagsModal: FC<EditTagsModalProps> = ({ show, onHide }) => {
  const { tags: availableTags, deleteTag, updateTag } = useTagsStore();

  return (
    <Modal open={show} onCancel={onHide} footer={null} title="Edit Tags">
      <Space size={[10, 16]} wrap>
        {availableTags.map(tag => (
          <Row className="gap-1" key={tag.id}>
            <Col>
              <Input
                value={tag.label}
                size="small"
                onChange={e => updateTag(tag.id, e.target.value)}
              />
            </Col>

            <Col xs={2}>
              <Button danger size="small" onClick={() => deleteTag(tag.id)}>
                &times;
              </Button>
            </Col>
          </Row>
        ))}
      </Space>
    </Modal>
  );
};

export default EditTagsModal;
