const router = require('express').Router();
const { Category, Product } = require('../../models');
let categoryData;

router.get('/', async (req, res) => {
  categoryData = await Category.findAll()
    .then(categoryData => res.json(categoryData))
      .catch(err => res.json(err));
});

router.get('/:id', async (req, res) => {
  categoryData = await Category.findByPk(req.params.id, { include: { model: Product }})
    .then(categoryData => res.json(categoryData))
      .catch(err => res.json(err));
});

router.post('/', async (req, res) => {
    categoryData = await Category.create({ category_name: req.body.category_name }) 
      .then(categoryData => res.json(categoryData))
        .catch(err => res.json(err));
});

router.put('/:id', async (req, res) => {
  categoryData = await Category.update(req.body, { where: { id: req.params.id } })
    .then(categoryData => res.json(categoryData))
      .catch(err => res.json(err));
});

router.delete('/:id', async (req, res) => {
  categoryData = await Category.destroy({ where: { id: req.params.id } })
    .then(categoryData => res.json(categoryData))
      .catch(err => res.json(err))
});

module.exports = router;