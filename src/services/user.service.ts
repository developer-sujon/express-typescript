//External Lib Import
import httpStatus from 'http-status';

//Internal Lib Import
import CustomError from '../helpers/CustomError';
import UserModel from '../models/user.model';

export const userCreateService = async (
  postBody: any = {},
  session: any
): Promise<any> => {
  const { name, mobile, password, email } = postBody;

  const existingUser = await userDetailsByPropertyService({ mobile });

  if (existingUser.length > 0) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'User is Already Registered');
  }

  const newUser = new UserModel({
    name,
    mobile,
    password,
    email,
  });

  return await newUser.save({ session });
};

export const userDetailsByPropertyService = async (
  matchQuery: any = {}
): Promise<any> => {
  return await UserModel.aggregate([
    {
      $match: matchQuery,
    },
    {
      $lookup: {
        from: 'owners',
        localField: '_id',
        foreignField: 'userId',
        as: 'owner',
      },
    },
    {
      $project: {
        ownerId: { $first: '$owner.ownerId' },
        name: 1,
        mobile: 1,
        email: 1,
        password: 1,
        role: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);
};
