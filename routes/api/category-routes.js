const router = require('express').Router();
const { Category, Product } = require('../../models');
let cateogryData;
// The `/api/categories` endpoint

/* router.get('/', async (req, res) => {
  // find all categories
  //try {
    categoryData = await Category.findAll({
    include: [
      { 
        model: Product,
      },
    ],
  }).then(categoryData => res.json(categoryData))
  .catch(err => res.json(err))}); */

router.get('/', async (req, res) => {
  try{
    categoryData = await Category.findAll({
      include: [{ model: Product }]
    })
    res.json(categoryData);
  } catch(err) {
    if (err) throw err;
    res.json(err);
  }
});


 router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    categoryData = await Category.findByPk(req.params.id, {
      include: { model: Product }
    });
    res.json(categoryData);
  } catch (err) {
    res.json(err);
  }
 });

router.post('/', async (req, res) => {
  // create a new category
  try {
    categoryData = await Category.create({
    category_name: req.body.category_name,
  });
    res.json(categoryData);
  } catch (err) {
    res.json(err)
  }
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

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
  res.json(categoryData);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;