//External Lib Import
import { Response } from 'express';
import mongoose from 'mongoose';
import httpStatus from 'http-status';

//Internal Lib Import
import catchAsync from '../helpers/catchAsync';
import CustomError from '../helpers/CustomError';
import subCategoryModel from '../models/subCategory.model';
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
 * @desc Sub Category Create
 * @access private
 * @route /api/v1/subCategory/subCategoryCreate
 * @methud POST
 */

export const subCategoryCreate = catchAsync(async (req: any, res: Response) => {
  const { name, categoryId } = req.body;

  const data = await createService(req, SubCategoryModel, { name, categoryId });
  res.json({ message: req.t('Sub Category Create Successfully'), data });
});

/**
 * @desc Sub Category List
 * @access private
 * @route /api/v1/subCategory/subCategoryList
 * @methud GET
 */

export const subCategoryList = catchAsync(async (req: any, res: Response) => {
  const projection = {
    $project: { label: '$name', value: '$_id' },
  };
  const data = await listService(req, SubCategoryModel, projection);
  res.json(data);
});

/**
 * @desc Sub Category Paginate
 * @access private
 * @route /api/v1/subCategory/subCategoryPaginate/:pageNumber/:perPage/:searchKeyword
 * @methud GET
 */

export const subCategoryPaginate = catchAsync(
  async (req: any, res: Response) => {
    const searchKeyword = req.params.searchKeyword;
    let searchRgx = { $regex: searchKeyword, $options: 'i' };
    let searchArray = [
      {
        name: searchRgx,
      },
    ];

    const data = await paginateService(req, SubCategoryModel, searchArray);
    res.json(data);
  }
);

/**
 * @desc subCategory Details
 * @access private
 * @route /api/v1/subCategory/subCategoryDetails/:id
 * @methud GET
 */

export const subCategoryDetails = catchAsync(
  async (req: any, res: Response) => {
    const data = await detailsService(req, SubCategoryModel);
    res.json(data);
  }
);

/**
 * @desc subCategory Update
 * @access private
 * @route /api/v1/subCategory/subCategoryUpdate/:id
 * @methud GET
 */

export const subCategoryUpdate = catchAsync(async (req: any, res: Response) => {
  const data = await updateService(req, SubCategoryModel);
  res.json({ message: req.t('Sub Category Update Successfull'), data });
});

/**
 * @desc subCategory Delete
 * @access private
 * @route /api/v1/subCategory/subCategoryDelete/:id
 * @methud DELETE
 */

export const subCategoryDelete = catchAsync(async (req: any, res: Response) => {
  const associalProduct = await checkAssociateService(
    req,
    {
      subCategoryId: new mongoose.Types.ObjectId(req.params.id),
    },
    ProductModel
  );

  if (associalProduct) {
    throw new CustomError(
      httpStatus.BAD_REQUEST,
      'This Sub Category Associate Product'
    );
  }

  const data = await deleteService(req, subCategoryModel);
  res.json({ message: req.t('Sub Category Delete Successfull'), data });
});
