//External Lib Import
import httpStatus from 'http-status';

//Internal Lib Import
import CustomError from '../helpers/CustomError';

export const createService = async (
  dataModel: any,
  unique: boolean,
  uniqueValue: object,
  errorMessage: string,
  postBody: object,
  session?: any
) => {
  const uniqueData = await dataModel.aggregate([{ $match: uniqueValue }]);

  if (unique && uniqueData.length > 0) {
    throw new CustomError(httpStatus.BAD_REQUEST, errorMessage);
  }
  const data = new dataModel(postBody);

  if (session) {
    return await data.save({ session });
  }
  return await data.save();
};

export const listService = async (
  dataModel: any,
  matchQuery: object,
  projection: object
) => {
  return await dataModel.aggregate([
    matchQuery,
    {
      $sort: { _id: -1 },
    },
    projection,
  ]);
};

export const listOneJoinService = async (
  dataModel: any,
  matchQuery: object,
  joinStage: object,
  projection: object
) => {
  return await dataModel.aggregate([
    matchQuery,
    joinStage,
    {
      $sort: { _id: -1 },
    },
    projection,
  ]);
};

export const detailsService = async (
  dataModel: any,
  matchQuery: object,
  projection: object
) => {
  return await dataModel.aggregate([
    matchQuery,
    {
      $sort: { _id: -1 },
    },
    projection,
  ]);
};

export const detailsJoinService = async (
  dataModel: any,
  matchQuery: object,
  joinStage: object,
  projection: object,
  replaceProperty: object
) => {
  if (replaceProperty) {
    return await dataModel.aggregate([
      matchQuery,
      joinStage,
      replaceProperty,
      projection,
    ]);
  }
  return await dataModel.aggregate([matchQuery, joinStage, projection]);
};

export const updateService = async (
  dataModel: any,
  matchQuery: object,
  postBody: object,
  errorMessage: string
) => {
  const data = await dataModel.findOne(matchQuery);

  if (!data) {
    throw new CustomError(httpStatus.BAD_REQUEST, errorMessage);
  }

  Object.assign(data, postBody);
  return await data.save();
};

export const deleteService = async (
  dataModel: any,
  matchQuery: object,
  errorMessage: string
) => {
  const data = await dataModel.findOne(matchQuery);

  if (!data) {
    throw new CustomError(httpStatus.BAD_REQUEST, errorMessage);
  }
  return await dataModel.deleteMany(matchQuery);
};
