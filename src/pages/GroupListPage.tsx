import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { store } from 'src/store/store';
import { observer } from 'mobx-react';

export const GroupListPage = observer((() => {
  const groupsList = store.groups;
  return (

    <Row xxl={4}>
      {groupsList && groupsList.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard
            groupContacts={groupContacts}
            withLink
          />
        </Col>
      ))}
    </Row>
  );
}));
