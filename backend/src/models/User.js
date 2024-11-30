const { Schema, model } = require("mongoose");
const { hash, compare } = require("bcrypt");
const { isEmail, isStrongPassword } = require("validator");
const salt = parseInt(process.env.SALT);

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
  },
  { timestamps: true }
);

UserSchema.statics.register = async function (data) {
  const { username, email, password } = data;

  // Verify the fields
  if (!username || !email || !password) {
    throw new Error("All fiels must be filled");
  }

  if (!isEmail(email)) {
    throw new Error("Invalid email");
  }

  if (!isStrongPassword(password)) {
    throw new Error("Invalid password");
  }

  // Create the user
  const existEmail = await this.findOne({ email: email });
  if (existEmail) {
    throw new Error("Email already used");
  } else {
    const existUsername = await this.findOne({ username: username });
    if (existUsername) {
      throw new Error("Username already used");
    } else {
      const hashedPassword = await hash(password, salt);
      const user = await this.create({
        username: username,
        email: email,
        password: hashedPassword,
      });
      return user;
    }
  }
};

UserSchema.statics.login = async function (data) {
  const { email, password } = data;

  // Verify the fields
  if (!email || !password) {
    throw new Error("All fiels must be filled");
  }

  const user = await this.findOne({ email: email });
  if (!user) {
    throw new Error("User not found");
  } else {
    const exist = await compare(password, user.password);
    if (exist) {
      return user;
    } else {
      throw new Error("Incorrect password");
    }
  }
};

UserSchema.statics.getProfile = async function (id) {
  const user = await this.findById(id);
  if (user) {
    return user;
  }
  throw new Error("Not authorized");
};

UserSchema.statics.updatePassword = async function (data) {
  const { id, password } = data;

  if (!password) {
    throw new Error("The new password is required");
  }

  if (!isStrongPassword(password)) {
    throw new Error("Invalid password");
  } else {
    const hashedPassword = await hash(password, salt);
    const user = await this.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (user) {
      return user;
    }
    throw new Error("Not authorized");
  }
};

UserSchema.statics.updateProfile = async function (data) {
  const { username, email, id } = data;

  if (!username || !email) {
    throw new Error("All fields must be filled in");
  }

  if (!isEmail(email)) {
    throw new Error("Email must be valid");
  } else {
    const user = await this.findByIdAndUpdate(
      id,
      {
        username: username,
        email: email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (user) {
      return user;
    }
    throw new Error("Not authorized");
  }
};

UserSchema.statics.updateImage = async function (data) {
  const { path, id } = data;
  const user = await this.findByIdAndUpdate(
    id,
    {
      profileImage: path,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (user) {
    return user;
  }
  throw new Error("Not authorized");
};

UserSchema.statics.deleteUser = async function (id) {
  const user = await this.findByIdAndDelete(id);
  if (user) {
    return user;
  }
  throw new Error("Not authorized");
};

const User = model("User", UserSchema);

module.exports = User;
