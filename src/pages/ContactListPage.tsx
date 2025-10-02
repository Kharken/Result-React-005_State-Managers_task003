import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm } from 'src/components/FilterForm';
import { useFindContacts } from 'src/hooks/useFindContacts';
import {store} from 'src/store/store';
import {observer} from 'mobx-react';

export const ContactListPage = (observer(() => {
  const contactsList = store.contacts
  const groupsList = store.groups

  const { onSubmit, contacts } = useFindContacts(contactsList, groupsList);

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm
          groupContactsList={groupsList}
          initialValues={{}}
          onSubmit={onSubmit}
        />
      </Col>
      <Col>
        <Row
          xxl={4}
          className="g-4"
        >
          {contacts && contacts.map((contact) => (
            <Col key={contact.id}>
              <ContactCard
                contactId={contact.id}
                withLink
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}))
