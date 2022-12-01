//External Lib Import
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const checkAssociateService = async (
  rqequest: any,
  queryObject: any,
  associateModel: any
) => {
  const ownerId = rqequest.ownerId;
  queryObject.ownerId = new ObjectId(ownerId);

  const data = await associateModel.aggregate([
    {
      $match: queryObject,
    },
  ]);

  return data.length > 0;
};

export default checkAssociateService;
