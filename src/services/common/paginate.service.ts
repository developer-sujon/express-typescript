//External Lib Import
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const paginateService = async (
  rqequest: any,
  dataModel: any,
  searchArray: object[]
) => {
  const ownerId = rqequest.ownerId;
  const searchKeyword = rqequest.params.searchKeyword;
  const pageNumber = +rqequest.params.pageNumber;
  const perPage = +rqequest.params.perPage;
  const skipRow = (pageNumber - 1) * perPage;

  if (searchKeyword !== '0') {
    return await dataModel.aggregate([
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
          ],
        },
      },
    ]);
  } else {
    return await dataModel.aggregate([
      {
        $match: { ownerId: new ObjectId(ownerId) },
      },
      {
        $facet: {
          Total: [{ $count: 'count' }],
          Data: [
            { $sort: { _id: -1 } },
            { $skip: skipRow },
            { $limit: perPage },
          ],
        },
      },
    ]);
  }
};

export default paginateService;
