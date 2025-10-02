import React, { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm } from 'src/components/FilterForm';
import { useFindContacts } from 'src/hooks/useFindContacts';
import { useGetGroupsQuery } from 'src/store/reducers/groups-reducer';
import { useGetContactsQuery } from 'src/store/reducers/contacts-reducer';

export const ContactListPage = memo(() => {
  const { data: contactsList } = useGetContactsQuery()
  const {data: groupsList, isLoading, error} = useGetGroupsQuery()
  const { onSubmit, contacts } = useFindContacts(contactsList, groupsList);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки групп</div>;
  }

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
});
