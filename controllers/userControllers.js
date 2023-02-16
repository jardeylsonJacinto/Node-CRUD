const User = require('../models/user');


// CRUD controllers

// get all users
exports.getUsers = (req, res, next) => {
  User.findAll()
    .then(users => {
      res.status(202).json({ users: users });
    })
    .catch(e => console.log(e));
}

// get user by id
exports.getUser = (req,res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then(user => {
      if(!user){
        return res.status(404).json({ message: 'User not fund!'});
      }
      res.status(200).json({ user: user });
    })
    .catch(e => console.log(e));
}

// create user
exports.createUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  User.create({
    name: name,
    email: email
  })
  .then(resul => {
    console.log('Created User');
    res.status(201).json({
      message:'User created successfully!',
      user: result
    })
    .catch(e => {
      console.log(e);
    });
  })
}

//update user
exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const updateName = req.body.name;
  const updateEmail = req.body.email;
  User.findByPk(userId)
    .then(user => {
      if(!user){
        return res.status(404).json({ message: 'User not found!'})
      }
      user.name = updateName;
      user.email = updateEmail;
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'User update!', user: result});
    })
    .catch(e => console.log(e));
}

// delete user
exports.deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then(user => {
      if(!user){
        return res.status(404).json({ message: 'User not found!'});
      }
      return User.destroy({
        where: {
          id: userId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'User deleted!'});
    })
    .catch(e => console.log(e));
}