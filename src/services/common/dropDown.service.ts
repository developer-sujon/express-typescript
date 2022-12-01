//External Lib Import
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const dropDownService = async (
  request: any,
  dataModel: any,
  matchQuery: any,
  projection: any
) => {
  const ownerId = request.ownerId;
  matchQuery.ownerId = new ObjectId(ownerId);

  return await dataModel.aggregate([
    { $match: matchQuery },
    { $project: projection },
  ]);
};

export default dropDownService;
