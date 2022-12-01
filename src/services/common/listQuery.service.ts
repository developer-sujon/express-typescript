//External Lib Import
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const listQueryService = async (
  rqequest: any,
  dataModel: any,
  queryObject: any
) => {
  const ownerId = rqequest.ownerId;
  queryObject.ownerId = new ObjectId(ownerId);

  return await dataModel.aggregate([
    {
      $match: queryObject,
    },
  ]);
};

export default listQueryService;
