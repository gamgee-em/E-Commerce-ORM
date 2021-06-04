const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
let productData;

router.get('/', async (req, res) => {
  productData = await Product.findAll({ include: { model: Category } })
    .then(productData => res.json(productData))
      .catch(err => res.json(err))
});

router.get('/:id', async (req, res) => {
  productData = await Product.findByPk(req.params.id, {
    include: { model: Category, model: Tag }})
      .then(productData => res.json(productData))
        .catch(err => res.json(err))
});

router.post('/', (req, res) => {
  let newProduct;
  Product.create(req.body)
    .then(product => {
      newProduct = product;
        if (req.body.tagIds.length) {
          const productTagIdArr = req.body.tagIds.map(tag_id => {
            return { product_id: product.id, tag_id };
          });
          return ProductTag.bulkCreate(productTagIdArr);
        }
    }) 
    .then(productTagIds => res.status(200).json({ newProduct, productTagIds }))
      .catch(err => res.status(400).json(err))
});

router.put('/:id', (req, res) => {
  Product.update(req.body, { where: { id: req.params.id },
  }).then(product => {
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then(productTags => {
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter(tag_id => !productTagIds.includes(tag_id))
          .map(tag_id => {
            return {
              product_id: req.params.id,
              tag_id,
            };
        });
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
        return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
      .then(updatedProductTags => res.json(updatedProductTags))
        .catch(err => res.status(400).json(err));
});

router.delete('/:id', async(req, res) => {
  productData = await Product.destroy({ where: { id: req.params.id } })
    .then(productData => res.json(productData))
      .catch(err => res.json(err))
});

module.exports = router;
