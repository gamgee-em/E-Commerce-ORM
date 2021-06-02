const router = require('express').Router();
const { Category, Product } = require('../../models');
let categoryData;
//* The `/api/categories` endpoint

//* find all categories
router.get('/', async (req, res) => {
  categoryData = await Category.findAll(/* { include: { model: Product }} */)
    .then(categoryData => res.json(categoryData))
      .catch(err => res.json(err));
});

  //* find one category by its `id` value
  //* be sure to include its associated Products
router.get('/:id', async (req, res) => {
  categoryData = await Category.findByPk(req.params.id, { include: { model: Product }})
    .then(categoryData => res.json(categoryData))
      .catch(err => res.json(err));
});

  //* create a new category
router.post('/', async (req, res) => {
    categoryData = await Category.create({
    category_name: req.body.category_name,
  }).then(categoryData => res.json(categoryData))
    .catch(err => res.json(err));
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
    try {
      categoryData = await Category.update(req.body, {
      where: { id: req.params.id },
    });
      res.json(categoryData);
    } catch (err) {
      res.json(err);
    }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  categoryData = await Category.destroy({ where: { id: req.params.id } })
    .then(categoryData => res.json(categoryData))
      .catch(err => res.json(err))
});

module.exports = router;