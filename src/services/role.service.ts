//External Lib Import
import mongoose from 'mongoose';
import { Request } from 'express';
const { ObjectId } = mongoose.Types;

//Internal Lib Import
import { Role } from '../models';
import { IRole } from '../interfaces';
import { commonService } from '.';

/**
 * @desc role create
 */

export const roleCreate = (request: Request): Promise<IRole> => {
  const { proprietorID, storeID, userID } = request;
  const { name, role } = request.body;
  const uniqueValue = { name };
  const errorMessage = 'Role Already Exists';
  const postBody = {
    proprietorID,
    storeID,
    userID,
    name,
    role,
  };
  return commonService.createUniqueService(
    Role,
    uniqueValue,
    errorMessage,
    postBody
  );
};

/**
 * @desc role dropDown
 */

export const roleDropDown = (request: Request): Promise<[IRole]> => {
  const { proprietorID, storeID } = request;
  const matchQuery = {
    $match: {
      proprietorID: new ObjectId(proprietorID),
      storeID: new ObjectId(storeID),
      status: true,
    },
  };

  const projection = {
    $project: {
      _id: 0,
      value: '$_id',
      label: '$name',
    },
  };

  return commonService.listService(Role, matchQuery, projection);
};

/**
 * @desc role list
 */

export const roleList = (request: Request): Promise<[IRole]> => {
  const { proprietorID, storeID } = request;
  const matchQuery = { proprietorID, storeID };
  const projection = '-proprietorID -storeID -userID';
  return commonService.findService(Role, matchQuery, projection);
};

/**
 * @desc role details
 */

export const roleDetails = (request: Request): Promise<IRole> => {
  const { proprietorID, storeID } = request;
  const matchQuery = { proprietorID, storeID, _id: request.params.id };
  const projection = '-proprietorID -storeID -userID';
  return commonService.findOneService(Role, matchQuery, projection);
};

/**
 * @desc role update
 */

export const roleUpdate = (request: Request): Promise<IRole> => {
  const { proprietorID, storeID } = request;
  const matchQuery = { proprietorID, storeID, _id: request.params.id };
  const notFoundErrorMessage = 'Role Not Found';
  return commonService.updateService(
    Role,
    matchQuery,
    request.body,
    notFoundErrorMessage
  );
};

/**
 * @desc role delete
 */

export const roleDelete = (request: Request): Promise<IRole> => {
  const { proprietorID, storeID } = request;
  const matchQuery = { proprietorID, storeID, _id: request.params.id };
  const notFoundErrorMessage = 'Role Not Found';
  return commonService.deleteService(Role, matchQuery, notFoundErrorMessage);
};
