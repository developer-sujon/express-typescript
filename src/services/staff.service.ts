//External Lib Import
import mongoose from 'mongoose';
import { Request } from 'express';
import httpStatus from 'http-status';
const { ObjectId } = mongoose.Types;

//Internal Lib Import
import { Staff, User } from '../models';
import { IStaff } from '../interfaces';
import CustomError from '../helpers/CustomError';
import { commonService } from '.';

/**
 * @desc staff create
 */

export const staffCreate = async (
  request: Request,
  session: any
): Promise<IStaff> => {
  const { proprietorID, storeID } = request;
  const password = 'pass1234';

  if (await User.isEmailTaken(request.body.email)) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (await User.isMobileTaken(request.body.mobile)) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'Mobile already taken');
  }

  const user = await new User(
    {
      proprietorID,
      storeID,
      password,
      ...request.body,
    },
    { session }
  ).save();

  return await new Staff({
    proprietorID,
    storeID,
    userID: user._id,
    ...request.body,
  }).save({ session });
};

/**
 * @desc staff dropDown
 */

export const staffDropDown = (request: Request): Promise<[IStaff]> => {
  const { proprietorID, storeID } = request;
  const matchQuery = {
    $match: {
      proprietorID: new ObjectId(proprietorID),
      storeID: new ObjectId(storeID),
      status: 'active',
    },
  };

  const projection = {
    $project: {
      _id: 0,
      value: '$_id',
      label: '$name',
    },
  };

  return commonService.listService(Staff, matchQuery, projection);
};

/**
 * @desc staff list
 */

export const staffList = (request: Request): Promise<[IStaff]> => {
  const { proprietorID, storeID } = request;
  const matchQuery = { proprietorID, storeID };
  const projection = '-proprietorID -storeID -userID';
  return commonService.findService(Staff, matchQuery, projection);
};

/**
 * @desc staff details
 */

export const staffDetails = (request: Request): Promise<IStaff> => {
  const { proprietorID, storeID } = request;
  const matchQuery = { proprietorID, storeID, _id: request.params.id };
  const projection = '-proprietorID -storeID -userID';
  return commonService.findOneService(Staff, matchQuery, projection);
};

/**
 * @desc staff update
 */

export const staffUpdate = async (
  request: Request,
  session: any
): Promise<IStaff> => {
  const { proprietorID, storeID } = request;
  const data = await Staff.findOne({
    proprietorID,
    storeID,
    _id: request.params.id,
  });

  if (!data) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'Staff Not Found');
  }

  Object.assign(data, request.body);
  await data.save({ session });

  await User.findByIdAndUpdate(
    data.userID,
    { $set: request.body },
    {
      session,
      new: true,
    }
  );
  return data;
};

/**
 * @desc staff delete
 */

export const staffDelete = async (
  request: Request,
  session: any
): Promise<IStaff> => {
  const { proprietorID, storeID } = request;
  const data = await Staff.findOne({
    proprietorID,
    storeID,
    _id: request.params.id,
  });

  if (!data) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'Staff Not Found');
  }

  await Staff.findByIdAndDelete(request.params.id, { session });
  await User.findByIdAndDelete(data.userID, { session });
  return data;
};
