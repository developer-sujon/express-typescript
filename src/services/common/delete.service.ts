const deleteService = async (request: any, dataModel: any) => {
  const deleteId = request.params.id;
  const ownerId = request.ownerId;

  return await dataModel.deleteMany({ _id: deleteId, ownerId });
};

export default deleteService;
