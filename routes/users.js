exports = module.exports = function (app, mongoose) {


  var express = require('express');
  var router = express.Router();
  var User = app.db.models.User;

  /* GET users listing. */
  router.get('/', function (req, res, next) {
    res.send('respond with a resource');
  });


  router.post('/signup', async function (req, res, next) {
    try {
      const { data } = req.body;
      const NewUser = new User(data);
      const NewUserToSend = await NewUser.save();
      res.send({ success: true, user: NewUserToSend })
    } catch (error) {
      res.send({ success: true, message: error.message })
    }
  });

  app.use("/users", router)

}

