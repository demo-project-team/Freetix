import express from 'express';
import { postCategory } from '../controller/category/postCategory.controller';
import { getCategory } from '../controller/category/getCategory.controller';
import { putCategory } from '../controller/category/putCategory.controller';

export const CategoryRouter = express.Router();
CategoryRouter.get('', getCategory);
CategoryRouter.post('', postCategory);
CategoryRouter.put('/:id', putCategory);
