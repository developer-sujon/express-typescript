const updateService = async (request: any, dataModel: any) => {
  const postBody = request.body;
  const ownerId = request.ownerId;
  const updateID = request.params.id;

  return dataModel.updateOne({ _id: updateID, ownerId }, postBody, {
    new: true,
  });
};

export default updateService;
