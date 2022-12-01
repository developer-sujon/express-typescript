//External Lib Import
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const paginateService = async (
  rqequest: any,
  dataModel: any,
  searchArray: [],
  projection: {}
) => {
  const ownerId = rqequest.ownerId;
  const { searchKeyword, pageNumber, perPage } = rqequest.params;

  const skipRow = (pageNumber - 1) * perPage;

  if (searchKeyword !== '0') {
    return await dataModel.aggregate([
      {
        $match: { ownerId: new ObjectId(ownerId) },
      },
      {
        $match: { $or: searchArray },
      },
      {
        $facet: {
          Total: [{ $count: 'count' }],
          Data: [
            { $sort: { _id: -1 } },
            { $skip: skipRow },
            { $limit: perPage },
            projection,
          ],
        },
      },
    ]);
  } else {
    return await dataModel.aggregate([
      {
        $match: { ownerId: ownerId },
      },
      {
        $facet: {
          Total: [{ $count: 'count' }],
          Data: [
            { $sort: { _id: -1 } },
            { $skip: skipRow },
            { $limit: perPage },
            projection,
          ],
        },
      },
    ]);
  }
};

export default paginateService;
