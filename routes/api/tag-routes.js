const router = require('express').Router();
const { Tag, Product } = require('../../models');
let tagData;

router.get('/', async (req, res) => {
  tagData = await Tag.findAll()
    .then(tagData => res.json(tagData))
      .catch(err => res.json(err))
});

router.get('/:id', async (req, res) => {
  tagData = await Tag.findByPk(req.params.id, {include: { model: Product } })
    .then(tagData => res.json(tagData))
      .catch(err => res.json(err))
});

router.post('/', async (req, res) => {
  tagData = await Tag.create(req.body)
    .then(tagData => res.json(tagData))
      .catch (err => res.json(err))
});

router.put('/:id', async (req, res) => {
  tagData = await Tag.update(req.body, { where: { id: req.params.id } })
    .then(tagData => res.json(tagData))
      .catch(err => res.json(err));
});

router.delete('/:id', async (req, res) => {
  tagData = await Tag.destroy({ where: { id: req.params.id } })
    .then(tagData => res.json(tagData))
      .catch(err => res.json(err));
});

module.exports = router;
