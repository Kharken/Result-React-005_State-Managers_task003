class ApiRouteConfig {
  private contacts = '/contacts';
  private groups = '/groups';

  get ContactsApiRoute() {
    return this.contacts;
  }

  get GroupsApiRoute() {
    return this.groups;
  }
}

export const apiRouteConfig = new ApiRouteConfig();
