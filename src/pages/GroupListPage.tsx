import React, { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useGetGroupsQuery } from 'src/store/reducers/groups-reducer';

export const GroupListPage = memo(() => {
  const {data: groupsList} = useGetGroupsQuery()
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
});
