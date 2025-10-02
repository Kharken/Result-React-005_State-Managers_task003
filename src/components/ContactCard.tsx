import { ContactDto } from 'src/types/dto/ContactDto';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {store} from 'src/store/store';
import {observer} from 'mobx-react';

interface ContactCardProps {
  contactId: string;
  withLink?: boolean;
}

export const ContactCard = observer((({ contactId, withLink }: ContactCardProps) => {
  const contactsList = store.contacts
  const contact: ContactDto | undefined = contactsList && contactsList.find((contact) => contact.id === contactId);
  // const favorites = useAppSelector(state => state.favorites);
  // const isInFavorites = contact && favorites.some(fav => fav === contact.id);

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
            >
              Add to favorites
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
}));
