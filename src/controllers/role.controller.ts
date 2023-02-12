//External Lib Import
import { Request, Response } from 'express';
import httpStatus from 'http-status';

//Internal Lib Import
import catchAsync from '../helpers/catchAsync';
import { roleService } from '../services';

/**
 * @desc role create
 * @access private
 * @route /api/v1/role/roleCreate
 * @methud POST
 */

export const roleCreate = catchAsync(async (req: Request, res: Response) => {
  await roleService.roleCreate(req);
  res.status(httpStatus.CREATED).json({ message: 'Role Create Successfull' });
});

/**
 * @desc role dropDown
 * @access private
 * @route /api/v1/role/roledropDown
 * @methud GET
 */

export const roleDropDown = catchAsync(async (req: Request, res: Response) => {
  const data = await roleService.roleDropDown(req);
  res.json(data);
});

/**
 * @desc role list
 * @access private
 * @route /api/v1/role/roleList
 * @methud GET
 */

export const roleList = catchAsync(async (req: Request, res: Response) => {
  const data = await roleService.roleList(req);
  res.json(data);
});

/**
 * @desc role details
 * @access private
 * @route /api/v1/role/roleDetails/:id
 * @methud GET
 */

export const roleDetails = catchAsync(async (req: Request, res: Response) => {
  const data = await roleService.roleDetails(req);
  res.json(data);
});

/**
 * @desc role update
 * @access private
 * @route /api/v1/role/roleUpdate/:id
 * @methud PATCH
 */

export const roleUpdate = catchAsync(async (req: Request, res: Response) => {
  await roleService.roleUpdate(req);
  res.json({ message: 'Role Update Successfull' });
});

/**
 * @desc role delete
 * @access private
 * @route /api/v1/role/roleDelete/:id
 * @methud DELETE
 */

export const roleDelete = catchAsync(async (req: Request, res: Response) => {
  await roleService.roleDropDown(req);
  res.json({ message: 'Role Delete Successfull' });
});
