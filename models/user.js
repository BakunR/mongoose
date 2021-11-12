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
    roles: {
      type: [
        {
          type: String,
          enum: ['admin', 'writer', 'guest']
        }
      ],
      default: ['admin']
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

UserSchema.pre('save', async function (next) {
  this.updateCounter = 5;
  this.save();

  next();
  console.log('THISSSSSSSSSSSS', this);
});

module.exports = mongoose.model('User', UserSchema);
