const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const bodyParser = require("body-parser");
// const userModal = require("../modals/user");

router.post(
  "./signup",
  [
    check("userName", "Please Enter a valid User Name").not().isEmpty(),
    check("userEmail", "Please Enter a valid User Password").isEmail(),
    check("userPassword", "Please Enter a valid User Password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    console.log(req.body);
    const { userName, userEmail, UserPassword } = req.body;

    try {
      let user = await User.findOne({
        userEmail,
      });
      if (user) {
        return res.status(400).json({
          msg: "User Already Present",
        });
      }
      user = new User({
        userName,
        userEmail,
        UserPassword,
      });

      const salt = await bcrypt.genSalt(10);
      user.UserPassword = await bcrypt.hash(UserPassword, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.send(200).json({
            token,
          });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error in Saving");
    }
  }
);

module.exports = router;
