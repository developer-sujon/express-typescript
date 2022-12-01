//External Lib Import
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const paginateOneJoinService = async (
  rqequest: any,
  dataModel: any,
  searchArray: [],
  projection: {},
  joinStageOne: {}
) => {
  const ownerId = rqequest.ownerId;
  const { searchKeyword, pageNumber, perPage } = rqequest.params;

  const skipRow = (pageNumber - 1) * perPage;

  if (searchKeyword !== '0') {
    return await dataModel.aggregate([
      {
        $match: { ownerId: new ObjectId(ownerId) },
      },
      joinStageOne,
      {
        $match: { $or: searchArray },
      },
      {
        $facet: {
          Total: [{ $count: 'count' }],
          Data: [
            { $skip: skipRow },
            { $sort: { _id: -1 } },
            { $limit: perPage },
            projection,
          ],
        },
      },
    ]);
  } else {
    return await dataModel.aggregate([
      {
        $match: { ownerId: new ObjectId(ownerId) },
      },
      joinStageOne,
      {
        $facet: {
          Total: [{ $count: 'count' }],
          Data: [
            { $skip: skipRow },
            { $sort: { _id: -1 } },
            { $limit: perPage },
            projection,
          ],
        },
      },
    ]);
  }
};

export default paginateOneJoinService;
