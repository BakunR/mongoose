const {SchemaType, SchemaTypes} = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      min: 5,
      max: 400,
      require: true,
      index: true,
      useCreateIndex: true
    },

    subTitle: {
      type: String,
      min: 5
    },
    description: {
      type: String,
      min: 5,
      max: 500,
      require: true
    },
    owner: {type: Schema.Types.ObjectId, ref: 'User', require}
    // category: [sport, games, history]
  },
  {
    timestamps: true
  }
);

// ArticleSchema.method.fullName = function () {
//   return `${this.firstName}  ${this.lastName}`;
// };

module.exports = mongoose.model('Article', ArticleSchema);
