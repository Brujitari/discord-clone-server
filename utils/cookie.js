const create = (res, token, extTime = 300000) => {
  res.cookie("access_token", token, {
    expires: new Date(Date.now() + extTime),
    secure: process.env.NODE_ENV === 'production'? true : false,
    httpOnly: true,
  });
};

const clear = (res) => {
  res.clearCookie("access_token");
};

module.exports = {
  create,
  clear,
};
