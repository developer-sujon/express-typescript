const createService = async (request: any, dataModel: any, postBody: any) => {
  postBody.ownerId = request.ownerId;

  const data = new dataModel(postBody);
  return await data.save();
};

export default createService;
