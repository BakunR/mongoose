const {SchemaType, SchemaTypes} = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      min: 5,
      max: 400,
      require: true
    },

    subTitle: {
      type: String,
      min: 5
    },
    // category: {
    //   type: [
    //     {
    //       type: String,
    //       enum: ['sport', 'games', 'history']
    //     }
    //   ],
    //   default: ['sport']
    // },
    description: {
      type: String,
      min: 5,
      max: 500,
      require: true
    },
    owner: {type: Schema.Types.ObjectId, ref: 'User', require}
  },

  {
    timestamps: true
  }
);

module.exports = mongoose.model('Article', ArticleSchema);
