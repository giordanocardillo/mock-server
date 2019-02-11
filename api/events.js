const resourceName = 'events'
const { db, router } = require('../utils/make-resource')(resourceName)
const collection = db.get(resourceName)

router.get('/', (req, res, next) => {
  res.locals.data = collection.value()
  next()
})

router.get('/:id', (req, res, next) => {
  res.locals.data = collection.find({ id: +req.params.id }).value()
  next()
})

module.exports = router
