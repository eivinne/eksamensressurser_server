import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  firstname: {
    type:String,
    required: true,
    min: ["3", "Email must be longer than 3"],
    max: ["25", "name cant be longer than 20 characters"],
  },
  lastname: {
    type: String,
    required: false,
    min: ["3", "Email must be longer than 3"],
    max: ["25", "name cant be longer than 20 characters"],

  },
  email: {
    type: String,
    required: true,
    min: ["3", "Email must be longer than 3"],
    max: ["20", "name cant be longer than 20 characters"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: ["3", "name cant be shorter than 3 characters"],
    max: ["20", "name cant be longer than 20 characters"],
  }
});

// Used https://faizanv.medium.com/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0 to handle password encryption. 

  UserSchema.pre('save', function(next) {
    // Check if document is new or a new password has been set
    if (this.isNew || this.isModified('password')) {
      // Saving reference to this because of changing scopes
      const document = this;
      bcrypt.hash(document.password, saltRounds,
        function(err, hashedPassword) {
        if (err) {
          next(err);
        }
        else {
          document.password = hashedPassword;
          next();
        }
      });
    } else {
      next();
    }
  });

  UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    });
  }

UserSchema.virtual('polls', {
    ref: 'Poll',
    localField: '_id',
    foreignField: 'creator',
    justOnce: true,
});

export default mongoose.model('User', UserSchema);


