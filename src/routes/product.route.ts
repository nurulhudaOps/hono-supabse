import { Hono } from 'hono';
import { basicAuth } from '../middlewares/basic-auth.js';
import { validate } from '../middlewares/validate.js';
import * as handler from '../handlers/product.handler.js';
import * as schema from '../validators/product.validator.js'

const router = new Hono();

router.get('/products', basicAuth(), handler.getAllProductsHandler);
router.get('/products/:id', validate('param', schema.productIdSchema), handler.getProductByIdHandler);
router.post('/products', handler.createProductHandler);
router.put('/products/:id', handler.updateProductHandler);
router.delete('/products/:id', handler.deleteProductHandler);

export default router;