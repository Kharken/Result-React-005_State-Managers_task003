import { makeAutoObservable } from 'mobx';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { BASE_URL } from 'src/api/api';
import { apiRouteConfig } from 'src/api/api-routes';

const FAVORITES_STORAGE_KEY = 'favorites';

interface Store {
  contacts: ContactDto[] | undefined;
  groups: GroupContactsDto[];
  favorites: ContactDto[];

  getContacts(): Generator<Promise<ContactDto[]>, void, ContactDto[]>;
  getFavorites(): ContactDto[];
  getGroups(): Generator<Promise<GroupContactsDto[]>, void, GroupContactsDto[]>;
  addToFavorites(id: string): void;
  removeFromFavorites(id: string): void;
  loadFavoritesFromStorage(): void;
  saveFavoritesToStorage(): void;
}

export const store = makeAutoObservable<Store>({
  contacts: [],
  groups: [],
  favorites: [],

  *getContacts() {
    this.contacts = yield fetch(`${BASE_URL}${apiRouteConfig.ContactsApiRoute}`)
      .then(res => res.json());
  },

  *getGroups() {
    this.groups = yield fetch(`${BASE_URL}${apiRouteConfig.GroupsApiRoute}`)
      .then(res => res.json());
  },

  getFavorites() {
    return this.favorites;
  },

  loadFavoritesFromStorage() {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        this.favorites = JSON.parse(storedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      this.favorites = [];
    }
  },

  addToFavorites(id: string) {
    if (!this.contacts) {
      return;
    }
    const contact = this.contacts.find(contact => contact.id === id);
    if (contact && !this.favorites.find(fav => fav.id === id)) {
      this.favorites.push(contact);
      this.saveFavoritesToStorage();
    }
  },

  removeFromFavorites(id: string) {
    this.favorites = this.favorites.filter(contact => contact.id !== id);
    this.saveFavoritesToStorage();
  },

  saveFavoritesToStorage() {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(this.favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }
});
