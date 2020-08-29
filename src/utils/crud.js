export const getOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id

  const doc = await model.findOne({ _id: id, createdBy: userId }).exec()

  if (!doc) {
    return res.status(400).end() // use a dot end for a status failure notice
  }

  res.json({ data: doc }) // res.status(200).json({data: doc})
}

export const getMany = model => async (req, res) => {
  const docs = await model.find({ createdBy: req.user._id })
  res.status(200).json({ data: docs })

  if (!docs) res.status(400).end()
}

export const createOne = model => async (req, res) => {
  const doc = await model
    .create({ ...req.body, createdBy: req.user._id })
    .exec()

  res.status(200).json({ data: doc }) // post request is 201 but could set to 200
}

export const updateOne = model => async (req, res) => {
  const doc = await model.findOneAndUpdate(
    {
      _id: req.params.id,
      createdBy: req.user._id
    },
    req.body,
    { new: true }
  )
  if (!doc) {
    return res.status(400).end()
  }

  res.status(200).json({ data: doc })
}

export const removeOne = model => async (req, res) => {
  const doc = await model
    .findOneAndRemove({
      _id: req.params.id,
      createdBy: req.user._id
    })
    .exec()

  if (doc) {
    return res.status(200).json({ data: doc })
  }

  return res.status(400).end()
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
