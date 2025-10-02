import { useEffect, useState } from 'react';
import { ContactDto } from 'src/types/dto/ContactDto';
import { FilterFormValues } from 'src/components/FilterForm';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';

export const useFindContacts = (
  contactsList: ContactDto[] | undefined,
  groupsList: GroupContactsDto[] | undefined,
) => {
  const [contacts, setContacts] = useState<ContactDto[] | undefined>([]);
  useEffect(() => {
    setContacts(contactsList);
  }, [contactsList]);
  const onSubmit = (fv: Partial<FilterFormValues>) => {
    let findContacts: ContactDto[] = [];

    if (fv.name) {
      const fvName = fv.name.toLowerCase();
      findContacts = findContacts.filter(
        ({ name }) => name.toLowerCase().indexOf(fvName) > -1,
      );
    }

    if (fv.groupId) {
      const groupContacts = groupsList && groupsList.find(({ id }) => id === fv.groupId);

      if (groupContacts) {
        findContacts = findContacts.filter(({ id }) =>
          groupContacts.contactIds.includes(id),
        );
      }
    }

    setContacts(findContacts);
  };

  return { onSubmit, contacts };
};
