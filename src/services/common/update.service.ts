//External Lib Import
import httpStatus from 'http-status';

//Internal Lib  import
import CustomError from '../../helpers/CustomError';

const updateService = async (request: any, dataModel: any) => {
  const postBody = request.body;
  const ownerId = request.ownerId;
  const updateID = request.params.id;

  const data = await dataModel.findOne({ _id: updateID, ownerId });

  if (!data) {
    throw new CustomError(
      httpStatus.BAD_REQUEST,
      `${dataModel.collection.collectionName} Not Found`
    );
  }

  Object.assign(data, postBody);
  return await data.save();
};

export default updateService;
