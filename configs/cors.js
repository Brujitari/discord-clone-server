const whitelist = ["http://localhost:3000", "https://discord-client-brujitari.vercel.app", "https://discord-client-six.vercel.app"];

module.exports = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error());
    }
  },
  credentials: true,
};