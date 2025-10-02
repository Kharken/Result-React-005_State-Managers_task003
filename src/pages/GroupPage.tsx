import React, { memo, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { Empty } from 'src/components/Empty';
import { ContactCard } from 'src/components/ContactCard';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useGetGroupsQuery } from 'src/store/reducers/groups-reducer';
import { useGetContactsQuery } from 'src/store/reducers/contacts-reducer';

export const GroupPage = memo(() => {
  const { groupId } = useParams<{ groupId: string }>();
  const { data: contactsList } = useGetContactsQuery()
  const { data: groupsList } = useGetGroupsQuery()
  const [findGroup, setFindGroup] = useState<GroupContactsDto | undefined>(
    undefined,
  );

  useEffect(() => {
    const findGroup = groupsList && groupsList.find(({ id }) => id === groupId);
    setFindGroup(findGroup);
  }, [groupId]);

  return (
    <Row className="g-4">
      {groupsList ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                {findGroup && <GroupContactsCard groupContacts={findGroup} />}
              </Col>
            </Row>
          </Col>
          <Col>
            <Row
              xxl={4}
              className="g-4"
            >
              {contactsList && contactsList.map((contact) => (
                <Col key={contact.id}>
                  <ContactCard
                    contactId={contact.id}
                    withLink
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : (
        <Empty />
      )}
    </Row>
  );
});
