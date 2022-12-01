//External Lib Import
import httpStatus from 'http-status';

//Internal Lib  import
import CustomError from '../../helpers/CustomError';

const deleteService = async (request: any, dataModel: any) => {
  const deleteId = request.params.id;
  const ownerId = request.ownerId;

  const data = await dataModel.findOne({ _id: deleteId, ownerId });

  if (!data) {
    throw new CustomError(
      httpStatus.BAD_REQUEST,
      `${dataModel.collection.collectionName} Not Found`
    );
  }
  await dataModel.deleteMany({ _id: deleteId, ownerId });

  return data;
};

export default deleteService;
