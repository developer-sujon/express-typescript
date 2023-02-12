//External Lib Import
import mongoose from 'mongoose';
import { Request } from 'express';
const { ObjectId } = mongoose.Types;

//Internal Lib Import
import { Month } from '../models';
import { IMonth } from '../interfaces';
import { commonService } from '.';

/**
 * @desc month create
 */

export const monthCreate = (request: Request): Promise<IMonth> => {
  const { proprietorID, storeID, userID } = request;
  const { name } = request.body;
  const uniqueValue = { name };
  const errorMessage = 'Name Already Exists';
  const postBody = {
    proprietorID,
    storeID,
    userID,
    name,
  };
  return commonService.createUniqueService(
    Month,
    uniqueValue,
    errorMessage,
    postBody
  );
};

/**
 * @desc month dropDown
 */

export const monthDropDown = (request: Request): Promise<[IMonth]> => {
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

  return commonService.listService(Month, matchQuery, projection);
};

/**
 * @desc month list
 */

export const monthList = (request: Request): Promise<[IMonth]> => {
  const { proprietorID, storeID } = request;
  const matchQuery = { proprietorID, storeID };
  const projection = '-proprietorID -storeID -userID';
  return commonService.findService(Month, matchQuery, projection);
};

/**
 * @desc month details
 */

export const monthDetails = (request: Request): Promise<IMonth> => {
  const { proprietorID, storeID } = request;
  const matchQuery = { proprietorID, storeID, _id: request.params.id };
  const projection = '-proprietorID -storeID -userID';
  return commonService.findOneService(Month, matchQuery, projection);
};

/**
 * @desc month update
 */

export const monthUpdate = (request: Request): Promise<IMonth> => {
  const { proprietorID, storeID } = request;
  const matchQuery = { proprietorID, storeID, _id: request.params.id };
  const notFoundErrorMessage = 'Month Not Found';
  return commonService.updateService(
    Month,
    matchQuery,
    request.body,
    notFoundErrorMessage
  );
};

/**
 * @desc month delete
 */

export const monthDelete = (request: Request): Promise<IMonth> => {
  const { proprietorID, storeID } = request;
  const matchQuery = { proprietorID, storeID, _id: request.params.id };
  const notFoundErrorMessage = 'Month Not Found';
  return commonService.deleteService(Month, matchQuery, notFoundErrorMessage);
};
