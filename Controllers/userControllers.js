const user = require("../Models/user");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

// exports.getLoginDetails=async(req,res,next)=>{
//    try{

//    }
// }

exports.postUserDetails = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 10, async (err, hash) => {
      const data = await user.create({
        name: req.body.name,
        email: email,
        password: password,
        password: hash,
      });
      res.status(201).json({ data });
    });
  } catch (err) {
    return err;
  }
};

const generateAccessToken = (id, email) => {
  return jwt.sign({ userId: id, email: email }, "sumanth11");
};

exports.postLoginDetails = async (req, res, next) => {
  const email = req.body.email;

  try {
    const specifiedUser = await user.findAll({ where: { email } });

    if (specifiedUser.length > 0) {
      bcrypt.compare(
        req.body.password,
        specifiedUser[0].password,
        (err, response) => {
          if (err) {
            throw new Error("Something Went Wrong");
          }
          if (response === true) {
            res.status(200).json({
              success: true,
              message: "Login successful",
              token: generateAccessToken(
                specifiedUser[0].id,

                specifiedUser[0].email
              ),
              email: specifiedUser[0].email,
            });
          } else {
            res
              .status(400)
              .json({ success: false, message: err.message });
          }
        }
      );
    } else {
      res.status(400).json({ success: false, message: "no data" });
    }
  } catch (err) {
    return err;
  }
};

exports.usernameAccess=async(req,res,next)=>{
  try{
    const username=await user.findAll({where:{id:req.user.userId}})
    
    res.status(200).json({username})
  }
  catch(err){
    res.status(400).json({success:false,message:err.message})
  }
 

}