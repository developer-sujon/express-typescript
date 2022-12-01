//External Lib Import
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const detailsService = async (request: any, dataModel: any) => {
  const detailsID = request.params.id;
  const ownerId = request.ownerId;

  return await dataModel.aggregate([
    {
      $match: {
        $and: [
          { ownerId: new ObjectId(ownerId) },
          { _id: new ObjectId(detailsID) },
        ],
      },
    },
  ]);
};

export default detailsService;
