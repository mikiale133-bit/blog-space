import User from "../backend/models/userModel";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "fill all requirements" });
  }

  if (!req.file) {
    return res.status(400).json({ msg: "upload an image" });
  }

  const userExists = await User.find({ email });
  if (userExists) {
    return res.status(400).json({ msg: "user already exists" });
  }

  const newUser = User.create({
    name,
    email,
    password,
    profile_img: {
      public_id: req.file.filename,
      url: req.file.path,
    },
  });

  if (newUser) {
    res.status(202).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresin: "30d" });
};
