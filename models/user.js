const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
      min: 2,
      max: 80
    },
    lastName: {
      type: String,
      require: true,
      min: 2,
      max: 80
    },
    email: String,
    age: Number,
    updateCounter: {
      type: Number,
      min: 0,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

UserSchema.method.fullName = function () {
  return `${this.firstName}  ${this.lastName}`;
};

// UserSchema.pre('save', next => {
//   this.updateCounter++;
//   //   this.save();
//   next();
// });

module.exports = mongoose.model('User', UserSchema);
