const mongoose = require("mongoose");
const Entry = require("../models/entry");
const Joi = require("joi");
const catchAsync = require('../utils/catchAsync')

module.exports.renderHome = (req, res) => {
  console.log("Current User:", req.user);
  res.render("home");
};

module.exports.show =  async (req, res) => {
  try{
    const entries = await Entry.find({ author: req.user._id }).populate('author')
  res.render("show", { entries })
  }catch {
    res.redirect('/login')
  }
}

module.exports.renderNew = (req, res) => {
  res.render("new");
};

module.exports.makeNew = async (req, res) => {
  try {
    const entry = new Entry(
      {title: req.body.title,
      content: req.body.content,
      date: new Date(),
      author: req.user._id});

    await entry.save();
    res.redirect(`/show/${entry._id}/`);
  } catch (error) {
    res.render("error", { error }); 
  }
};

module.exports.renderEdit = catchAsync(async (req, res) => {
  const { id } = req.params;
  const editEntry = await Entry.findById(id);
  res.render("edit", { editEntry });
  console.log(editEntry);
});

module.exports.makeEdit = catchAsync(async (req, res) => {
  const { id } = req.params;
  try {
      const FoundEntry = await Entry.findByIdAndUpdate(id, req.body, { new: true });
      if (!FoundEntry) {
          return res.status(404).send("Entry not found");
      }
      res.redirect("/show"); 
  } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
  }
})

module.exports.renderShow = catchAsync(async (req, res) => {
  const { id } = req.params;
  const foundEntry = await Entry.findById(id).populate('author');
  console.log(foundEntry); // 🔍 Debug: Check if author is populated
  res.render("individual", { foundEntry });
});

module.exports.delete = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deleteEntry = await Entry.findByIdAndDelete(id);
  res.redirect("/show");
  console.log(`Deleted: ${deleteEntry}`);
});

