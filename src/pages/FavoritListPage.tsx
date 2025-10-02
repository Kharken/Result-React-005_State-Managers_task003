import React, { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { ContactDto } from 'src/types/dto/ContactDto';

export const FavoritListPage = memo(() => {
  const favoriteContacts = useAppSelector(state => state.favorites);

  return (
    <Row xxl={4} className="g-4">
      {favoriteContacts.map((contact) => (
        <Col key={contact}>
          <ContactCard
            contactId={contact}
            withLink
          />
        </Col>
      ))}
    </Row>
  );
});
