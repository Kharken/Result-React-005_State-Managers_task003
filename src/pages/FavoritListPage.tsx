import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { ContactDto } from 'src/types/dto/ContactDto';
import { store } from 'src/store/store';
import { observer } from 'mobx-react';

export const FavoritListPage = observer(() => {
  const favoriteContacts: ContactDto[] = store.favorites;

  // Загружаем избранное из LocalStorage при монтировании компонента
  useEffect(() => {
    store.loadFavoritesFromStorage();
  }, []);

  return (
    <Row xxl={4} className="g-4">
      {favoriteContacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard
            contactId={contact.id}
            withLink
          />
        </Col>
      ))}
    </Row>
  );
});
