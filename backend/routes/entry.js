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

router.get("/show", async (req, res) => {
  const entries = await Entry.find({})
  res.render("show", { entries })
})
router.route("/show/:id/edit")
.get(entryController.renderEdit)


// router.put("/update/:id", entryController.makeEdit)

router.put('/update/:id', async(req,res)=>{
  const {id} = req.params
  const FoundEntry = await Entry.findByIdAndUpdate(id,req.body, {new:true})
  res.redirect(`/show/${id}`);
})

router
  .route("/show/:id")
  .get(middleware.isAuth,entryController.renderShow)
  .delete(middleware.isAuth,entryController.delete)

module.exports = router
