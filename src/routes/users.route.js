const router = require("express").Router();
const { signUpUsers, signInUsers } = require("../controllers/auth.controller");
const validate = require("../middlewares/validate");
const { signupSchema, signinSchema } = require("../validators/auth.schema");

router.post("/signup", validate(signupSchema), signUpUsers);
router.post("/signin", validate(signinSchema), signInUsers);

module.exports = router;
