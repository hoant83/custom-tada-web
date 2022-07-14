import React from 'react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { Card, Form } from 'react-bootstrap';

interface ComponentProps {
  handleChange: any;
  value: any;
}

const AdditionalNote = (props: ComponentProps) => {
  const { handleChange, value } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { PRICE_QUOTATION_NOTE_TITLE, PRICE_QUOTATION_NOTE_PLACEHOLDER } = I18N;

  return (
    <Card
      style={{
        boxShadow: '0 0 25px rgb(221 221 221 / 65%)',
        border: 'none',
        borderRadius: '12px',
      }}
    >
      <Card.Header
        className="text-center"
        style={{
          border: 'none',
          borderRadius: '12px 12px 0 0',
          background: 'linear-gradient(90deg, #ffd424 0, #fab91a 100%)',
          fontSize: '15px',
        }}
      >
        {t(PRICE_QUOTATION_NOTE_TITLE)}
      </Card.Header>
      <Card.Body>
        <Form.Control
          onChange={handleChange}
          value={value}
          as="textarea"
          style={{ width: '100%' }}
          rows={5}
          placeholder={t(PRICE_QUOTATION_NOTE_PLACEHOLDER)}
        />
      </Card.Body>
    </Card>
  );
};

export default AdditionalNote;
