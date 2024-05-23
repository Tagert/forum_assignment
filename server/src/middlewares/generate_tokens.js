import jwt from "jsonwebtoken";

const generateJwToken = (userId, email, name) => {
  const jwt_token = jwt.sign(
    {
      userId: userId,
      email: email,
      name: name,
    },
    process.env.JWT_KEY,
    { expiresIn: "2h" }
  );

  return jwt_token;
};

const generateRefreshToken = (userId, email, name) => {
  const refresh_token = jwt.sign(
    {
      userId: userId,
      email: email,
      name: name,
    },
    process.env.REFRESH_JWT_KEY,
    { expiresIn: "24h" }
  );

  return refresh_token;
};

export { generateJwToken, generateRefreshToken };
