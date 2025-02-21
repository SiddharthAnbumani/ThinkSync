const express = require("express")
const router = express.Router()
const entryController = require("../controllers/entry")
const Entry = require("../models/entry")
const {validatedEntry} = require('../middleware')
const middleware = require('../middleware')

router.get("/", entryController.renderHome)
router
  .route("/new")
  .get(middleware.isAuth,entryController.renderNew)
  .post(middleware.isAuth,validatedEntry,entryController.makeNew)



router.get("/show", entryController.show)


router.put('/update/:id', entryController.makeEdit);

router.route("/show/:id/edit")
.get(entryController.renderEdit)


router
  .route("/show/:id")
  .get(middleware.isAuth,entryController.renderShow)
  .delete(middleware.isAuth,entryController.delete)

module.exports = router
