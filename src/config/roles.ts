let allRoles: {
  proprietor: string[];
  admin: string[];
  manager: string[];
  owner: string[];
};

allRoles = {
  proprietor: [],
  admin: [],
  manager: [],
  owner: [],
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
