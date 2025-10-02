import React, { memo } from 'react';
import { ContactDto } from 'src/types/dto/ContactDto';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useGetContactsQuery } from 'src/store/reducers/contacts-reducer';
import { addToFavorites, removeFromFavorites } from 'src/store/reducers/favorites-reducer';
import { useAppSelector } from 'src/hooks/useAppSelector';

interface ContactCardProps {
  contactId: string;
  withLink?: boolean;
}

export const ContactCard = memo<ContactCardProps>(({ contactId, withLink }) => {
  const dispatch = useAppDispatch();
  const { data: contactsList } = useGetContactsQuery()
  const contact: ContactDto | undefined = contactsList && contactsList.find((contact) => contact.id === contactId);
  const favorites = useAppSelector(state => state.favorites);
  const isInFavorites = contact && favorites.some(fav => fav === contact.id);

  const handleToggleFavorite = () => {
    if (isInFavorites) {
      dispatch(removeFromFavorites(contactId));
    } else {
      dispatch(addToFavorites(contactId));
    }
  };

  if (!contact) {
    return null;
  }

  const { photo, id, name, phone, birthday, address } = contact;
  return (
    <Card key={id}>
      <Card.Img
        variant="top"
        src={photo}
      />
      <Card.Body>
        <Card.Title>
          {withLink ? <Link to={`/contact/${id}`}>{name}</Link> : name}
        </Card.Title>
        <Card.Body>
          <ListGroup>
            <Button
              variant={contact.isFavorite ? 'success' : 'outline-primary'}
              onClick={handleToggleFavorite}
            >
              {isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
            </Button>
            <ListGroup.Item>
              <Link
                to={`tel:${phone}`}
                target="_blank"
              >
                {phone}
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>{birthday}</ListGroup.Item>
            <ListGroup.Item>{address}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card.Body>
    </Card>
  );
});
