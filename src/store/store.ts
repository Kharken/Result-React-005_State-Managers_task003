import contacts from 'src/__data__/contacts.json'
import groups from 'src/__data__/group-contacts.json'
import {makeAutoObservable} from 'mobx';

export const store = makeAutoObservable({
  contacts,
  groups,
  favorites: []
})
