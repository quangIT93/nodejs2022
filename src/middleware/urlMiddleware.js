// module.exports = function urlMiddleware(req, res, next) {
//   res.locals._url = {
//     enabled: false,
//     type: "default",
//   };

//   if (req.query.hasOwnProperty("_id")) {
//     res.locals._url.enabled = true;
//     res.locals._url.type = req.query.url;
//   }

//   next();
// };
