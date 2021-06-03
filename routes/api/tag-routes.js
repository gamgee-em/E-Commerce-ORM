const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
let tagData;
//* The `/api/tags` endpoint
//* find all tags 
router.get('/', async (req, res) => {
  tagData = await Tag.findAll(/* {include: { model: Product}} */)
    .then(tagData => res.json(tagData))
      .catch(err => res.json(err))
});

//* find a single tag by its `id`
//* be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  tagData = await Tag.findByPk(req.params.id, /* {include: { model: Product } }*/)
    .then(tagData => res.json(tagData))
      .catch(err => res.json(err))
});

router.post('/', async (req, res) => {
  // create a new tag
  tagData = await Tag.create(req.body)
  res.json(tagData)
    //.then(tagData => res.json(tagData))
      .catch (err => res.json(err))
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  tagData = await Tag.destroy({ where: { id: req.params.id } })
  res.json(tagData)
  .catch(err => res.json(err));
  // delete on tag by its `id` value
});

module.exports = router;
