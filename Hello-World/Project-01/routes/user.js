const express = require("express");
const {handleGetAllUsers,HandleGetUserbyId,HandleUpdateUserbyId,HandleDeleteUserbyId, HandleCreateUserbyId} = require('../controllers/user')
const router = express.Router();



router.
       route("/")
       .get(handleGetAllUsers)
       .post(HandleCreateUserbyId );

router
  .route("/:id")
  .get(HandleGetUserbyId)
  .patch(HandleUpdateUserbyId)
  .delete(HandleDeleteUserbyId);




module.exports = router;