//External Lib Import
import { Response } from 'express';
import mongoose from 'mongoose';
import httpStatus from 'http-status';

//Internal Lib Import
import catchAsync from '../helpers/catchAsync';
import CustomError from '../helpers/CustomError';
import CategoryModel from '../models/category.model';
import createService from '../services/common/create.service';
import checkAssociateService from '../services/common/check.associate.service';
import listService from '../services/common/list.service';
import detailsService from '../services/common/details.service';
import paginateService from '../services/common/paginate.service';
import updateService from '../services/common/update.service';
import deleteService from '../services/common/delete.service';
import SubCategoryModel from '../models/subCategory.model';
import ProductModel from '../models/product.model';

/**
 * @desc Category Create
 * @access private
 * @route /api/v1/category/categoryCreate
 * @methud POST
 */

export const categoryCreate = catchAsync(async (req: any, res: Response) => {
  const { name, type } = req.body;

  const data = await createService(req, CategoryModel, { name, type });
  res.json({ message: req.t('Category Create Successfully'), data });
});

/**
 * @desc Category List
 * @access private
 * @route /api/v1/category/categoryList
 * @methud GET
 */

export const categoryList = catchAsync(async (req: any, res: Response) => {
  const projection = {
    $project: { label: '$name', value: '$_id' },
  };
  const data = await listService(req, CategoryModel, projection);
  res.json(data);
});

/**
 * @desc Category Paginate
 * @access private
 * @route /api/v1/category/categoryPaginate/:pageNumber/:perPage/:searchKeyword
 * @methud GET
 */

export const categoryPaginate = catchAsync(async (req: any, res: Response) => {
  const searchKeyword = req.params.searchKeyword;
  let searchRgx = { $regex: searchKeyword, $options: 'i' };
  let searchArray = [
    {
      name: searchRgx,
    },
    {
      type: searchRgx,
    },
  ];

  const data = await paginateService(req, CategoryModel, searchArray);
  res.json(data);
});

/**
 * @desc Category Details
 * @access private
 * @route /api/v1/category/categoryDetails/:id
 * @methud GET
 */

export const categoryDetails = catchAsync(async (req: any, res: Response) => {
  const data = await detailsService(req, CategoryModel);
  res.json(data);
});

/**
 * @desc Category Update
 * @access private
 * @route /api/v1/category/categoryUpdate/:id
 * @methud GET
 */

export const categoryUpdate = catchAsync(async (req: any, res: Response) => {
  const data = await updateService(req, CategoryModel);
  res.json({ message: req.t('Category Update Successfull'), data });
});

/**
 * @desc Category Delete
 * @access private
 * @route /api/v1/category/categoryDelete/:id
 * @methud DELETE
 */

export const categoryDelete = catchAsync(async (req: any, res: Response) => {
  const associalSubCategory = await checkAssociateService(
    req,
    {
      categoryId: new mongoose.Types.ObjectId(req.params.id),
    },
    SubCategoryModel
  );

  if (associalSubCategory) {
    throw new CustomError(
      httpStatus.BAD_REQUEST,
      'This Category Associate Sub Category'
    );
  }

  const associalProduct = await checkAssociateService(
    req,
    {
      categoryId: new mongoose.Types.ObjectId(req.params.id),
    },
    ProductModel
  );

  if (associalProduct) {
    throw new CustomError(
      httpStatus.BAD_REQUEST,
      'This Category Associate Product'
    );
  }

  const data = await deleteService(req, CategoryModel);
  res.json({ message: req.t('Category Delete Successfull'), data });
});
