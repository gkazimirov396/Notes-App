import type { FC } from 'react';

import { Button, Col, Input, Modal, Row, Space } from 'antd';

import type { ITag } from '../utils/types';

interface EditTagsModalProps {
  availableTags: ITag[];
  show: boolean;
  onHide: () => void;
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
}

const EditTagsModal: FC<EditTagsModalProps> = ({
  availableTags,
  show,
  onHide,
  onDeleteTag,
  onUpdateTag,
}) => {
  return (
    <Modal open={show} onCancel={onHide} footer={null} title="Edit Tags">
      <Space size={[10, 16]} wrap>
        {availableTags.map(tag => (
          <Row className="gap-1" key={tag.id}>
            <Col>
              <Input
                value={tag.label}
                size="small"
                onChange={e => onUpdateTag(tag.id, e.target.value)}
              />
            </Col>
            <Col xs={2}>
              <Button danger size="small" onClick={() => onDeleteTag(tag.id)}>
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
