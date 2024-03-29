require("dotenv").config();
const { Schema, default: mongoose } = require("mongoose");
const mongooseFieldEncryption =
  require("mongoose-field-encryption").fieldEncryption;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  phoneNumber: { type: Number },
});

userSchema.plugin(mongooseFieldEncryption, {
  fields: ["name", "email", "phoneNumber"],
  secret: "some secret key",
  saltGenerator: function (secret) {
    return "1234567890123456";
    // should ideally use the secret to return a string of length 16,
    // default = `const defaultSaltGenerator = secret => crypto.randomBytes(16);`,
    // see options for more details
  },
});

exports.User = mongoose.model("Users", userSchema);
