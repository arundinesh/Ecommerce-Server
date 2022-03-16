const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../utility");
function generateAccessToken(username) {
  console.log(TOKEN_SECRET);
  return jwt.sign(
    {
      data: username,
    },
    TOKEN_SECRET,
    { expiresIn: "1h" }
  );
}

function authenticateToken(req, res, next) {
  console.log(req.headers.authorization.split("Bearer "));
  const authHeader = req.headers.authorization.split("Bearer ")[1];
  console.log(authHeader);
  const token = authHeader;

  if (token == null) return res.sendStatus(401);
  console.log(token, TOKEN_SECRET);
  let userData = jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    return user.data;
  });
  return userData;
}

module.exports = { generateAccessToken, authenticateToken };
