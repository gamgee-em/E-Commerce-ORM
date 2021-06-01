const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product}]
   });
  res.json(tagData);
  } catch (err) {
    if (err) throw err;
    res.json(err);
  };
  // be sure to include its associated Product data
});

// find a single tag by its `id`
// be sure to include its associated Product data

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    res.json(tagData);
  } catch(err) {
    res.json(err);
  };
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({

    })
  } catch (err) {
    if (err) throw err;
    res.json(tagData);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
