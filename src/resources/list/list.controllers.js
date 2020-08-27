import { Item } from '../item/item.model'
import mongoose from 'mongoose'
import { connect } from '../../utils/db'

// creating an example connection to a mongoDb database

const run = async () => {
  // connect to a mongo db database refer to the utilss folder above
  await connect('mongodb://localhost:27017/api-test')
  // create the items in the schema
  const item = await Item.create({
    name: 'clean up',
    createdBy: mongoose.Types.ObjectId,
    list: mongoose.Types.ObjectId
  })

  console.log(item)

  // .exec() => execute which returns a promise

  // read from a model
  console.log(await Item.findById(item._id).exec())

  // update a schema  use await cos its an async function
  const updated = await Item.findByIdAndUpdate(
    item._id,
    {
      name: 'eat'
    },
    { new: true } // ensuring that the returned object is the updated info
  ).exec()
  console.log(updated)

  // remove an item from a database

  const remove = await (await Item.findByIdAndRemove(item._id)).execPopulate()

  console.log(remove)
}

run()

// import { crudControllers } from '../../utils/crud'
// import { List } from './list.model'

// export default crudControllers(List)
