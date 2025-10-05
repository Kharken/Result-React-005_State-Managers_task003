import contacts from 'src/__data__/contacts.json';
import groups from 'src/__data__/group-contacts.json';
import { makeAutoObservable } from 'mobx';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { BASE_URL } from 'src/api/api';
import { apiRouteConfig } from 'src/api/api-routes';

interface Store {
  contacts: ContactDto[] | undefined;
  groups: GroupContactsDto[];
  favorites: ContactDto[];
  getContacts(): Generator<Promise<ContactDto[]>, void, ContactDto[]>;
  getFavorites(): Generator<ContactDto[], void, ContactDto[]>;
  getGroups(): Generator<Promise<GroupContactsDto[]>, void, GroupContactsDto[]>;
  addToFavorites(id: string): Generator<void, void, ContactDto>;
}

export const store = makeAutoObservable<Store>({
  contacts: [],
  groups: [],
  favorites: [],
  *getContacts(){
    this.contacts = yield fetch(`${BASE_URL}${apiRouteConfig.ContactsApiRoute}`)
      .then(res => res.json())
  },
  *getGroups(){
    this.groups = yield fetch(`${BASE_URL}${apiRouteConfig.GroupsApiRoute}`)
      .then(res => res.json())
  },
  *getFavorites(){
    yield this.favorites
  },
  *addToFavorites(id: string) {
    if (!this.contacts) {
      return;
    }
    const contact = this.contacts.find(contact => contact.id === id);
    if (contact && !this.favorites.find(fav => fav.id === id)) {
      this.favorites.push(contact);
    }
  }
})
