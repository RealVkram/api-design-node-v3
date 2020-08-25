import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    name: {
      maxlength: 50,
      required: true,
      trim: true,
      type: String
    },
    status: {
      default: 'active',
      enum: [
        'active',
        'complete',
        'pastdue'
      ] /* enum ==> required but can only be of these things i.e either active, complete */,
      required: true,
      type: String
    },
    notes: String,
    due: Date,
    createdBy: {
      ref: 'user' /* ref ==> references the table to relate with */,
      required: true,
      type: mongoose.SchemaTypes.ObjectId
    },
    list: {
      ref: 'list',
      required: true,
      type: mongoose.SchemaTypes.ObjectId
    }
  },
  { timestamps: true }
)

// compound index with the list prop with name unique with 1 reping sort by asc and -1 its desc
itemSchema.index({ list: 1, name: 1 }, { unique: true })
export const Item = mongoose.model('item', itemSchema)
