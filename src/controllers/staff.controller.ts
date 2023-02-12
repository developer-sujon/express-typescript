//External Lib Import
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

//Internal Lib Import
import catchAsync from '../helpers/catchAsync';
import { staffService } from '../services';

/**
 * @desc staff create
 * @access private
 * @route /api/v1/staff/staffCreate
 * @methud POST
 */

export const staffCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await staffService.staffCreate(req, session);
    await session.commitTransaction();
    await session.endSession();
    res
      .status(httpStatus.CREATED)
      .json({ message: 'Staff Create Successfully Pasword pass1234' });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

/**
 * @desc staff dropDown
 * @access private
 * @route /api/v1/staff/staffdropDown
 * @methud GET
 */

export const staffDropDown = catchAsync(async (req: Request, res: Response) => {
  const data = await staffService.staffDropDown(req);
  res.json(data);
});

/**
 * @desc staff list
 * @access private
 * @route /api/v1/staff/staffList
 * @methud GET
 */

export const staffList = catchAsync(async (req: Request, res: Response) => {
  const data = await staffService.staffList(req);
  res.json(data);
});

/**
 * @desc staff details
 * @access private
 * @route /api/v1/staff/staffDetails/:id
 * @methud GET
 */

export const staffDetails = catchAsync(async (req: Request, res: Response) => {
  const data = await staffService.staffDetails(req);
  res.json(data);
});

/**
 * @desc staff update
 * @access private
 * @route /api/v1/staff/staffUpdate/:id
 * @methud PATCH
 */

export const staffUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await staffService.staffUpdate(req, session);
    await session.commitTransaction();
    await session.endSession();
    res.json({ message: 'Staff Update Successfull' });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

/**
 * @desc staff delete
 * @access private
 * @route /api/v1/staff/staffDelete/:id
 * @methud DELETE
 */

export const staffDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await staffService.staffDelete(req, session);
    await session.commitTransaction();
    await session.endSession();
    res.json({ message: 'Staff Delete Successfull' });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};
