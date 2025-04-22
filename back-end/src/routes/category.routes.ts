import express from 'express';
import { postCategory } from '../controller/category/postCategory.controller';
import { getCategory } from '../controller/category/getCategory.controller';
import { putCategory } from '../controller/category/putCategory.controller';
import { getCategoryById } from '../controller/category/getCategoryById.controller';

export const CategoryRouter = express.Router();
CategoryRouter.get('', getCategory);
CategoryRouter.get('/:id', getCategoryById)
CategoryRouter.post('', postCategory);
CategoryRouter.put('/:id', putCategory);
