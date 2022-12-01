//External Lib Import
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

//Internal Lib Import
import shuffleArray from '../../helpers/shuffleArray';
const listShuffleService = async (
  request: any,
  dataModel: any,
  matchQuery: any
) => {
  const ownerId = request.ownerId;

  matchQuery.ownerId = new ObjectId(ownerId);

  let data = await dataModel.aggregate([{ $match: matchQuery }]);
  return shuffleArray(data);
};

export default listShuffleService;
