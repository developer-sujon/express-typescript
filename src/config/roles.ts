let allRoles: Object = {
  proprietor: [],
  admin: [],
  manager: [],
  owner: [],
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
