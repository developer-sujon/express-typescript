//External Lib Import
import httpStatus from 'http-status';

//Internal Lib Import
import CustomError from '../helpers/CustomError';

export const createUniqueService = async (
  dataModel: any,
  uniqueValue: object,
  uniqueErorMessage: string,
  postBody: object
) => {
  const uniqueData = await dataModel.findOne(uniqueValue);

  if (uniqueData && Object.entries(uniqueData).length > 0) {
    throw new CustomError(httpStatus.BAD_REQUEST, uniqueErorMessage);
  }
  return await new dataModel(postBody).save();
};

export const listService = async (
  dataModel: any,
  matchQuery: object,
  projection: object,
  sort?: object
) => {
  sort = sort || {
    $sort: { _id: -1 },
  };
  return await dataModel.aggregate([matchQuery, projection, sort]);
};

export const findService = (
  dataModel: any,
  matchQuery: object,
  projection: string,
  sort?: object
) => {
  sort = sort || { _id: -1 };
  return dataModel.find(matchQuery).select(projection).sort(sort);
};

export const findOneService = (
  dataModel: any,
  matchQuery: object,
  projection: string
) => {
  return dataModel.findOne(matchQuery).select(projection);
};

export const updateService = async (
  dataModel: any,
  matchQuery: object,
  postBody: object,
  notFoundErrorMessage: string
) => {
  const data = await dataModel.findOne(matchQuery);
  if (!data) {
    throw new CustomError(httpStatus.BAD_REQUEST, notFoundErrorMessage);
  }
  Object.assign(data, postBody);
  return await data.save();
};

export const deleteService = async (
  dataModel: any,
  matchQuery: object,
  notFoundErrorMessage: string
) => {
  const data = await dataModel.findOne(matchQuery);
  if (!data) {
    throw new CustomError(httpStatus.BAD_REQUEST, notFoundErrorMessage);
  }
  return await dataModel.deleteMany(matchQuery);
};
