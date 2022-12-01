const createService = async (request: any, dataModel: any) => {
  const postBody = request.body;
  postBody.ownerId = request.ownerId;

  const data = new dataModel(postBody);
  return await data.save();
};

export default createService;
