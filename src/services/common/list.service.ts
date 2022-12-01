//External Lib Import
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const listService = async (
  rqequest: any,
  dataModel: any,
  projection: object
) => {
  const ownerId = rqequest.ownerId;

  return await dataModel.aggregate([
    {
      $match: {
        ownerId: new ObjectId(ownerId),
      },
    },
    projection,
  ]);
};

export default listService;
