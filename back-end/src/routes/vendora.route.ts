import express from 'express';
import { getVendora } from '../controller/vendor/getVendora.controller';

const router = express.Router();

// GET /api/vendora
router.get('/', getVendora);

export { router as VendoraRouter };
