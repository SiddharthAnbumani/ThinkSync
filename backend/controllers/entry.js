const mongoose = require("mongoose");
const Entry = require("../models/entry");
const Joi = require("joi");
const catchAsync = require('../utils/catchAsync')

module.exports.renderHome = (req, res) => {
  res.render("home");
};

// module.exports.renderShow = async(req,res)=>{
//     const entries = await Entry.find({})
//     res.render('show',{entries})
// }
// module.exports.renderShow =

module.exports.renderNew = (req, res) => {
  res.render("new");
};

module.exports.makeNew = async (req, res) => {
  try {
    const entry = new Entry(req.body);
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
    const foundEntry = await Entry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.redirect(`/show/${id}`);
});

module.exports.renderShow = catchAsync(async (req, res) => {
  const { id } = req.params;
  const foundEntry = await Entry.findById(id);
  res.render("individual", { foundEntry });
});

module.exports.delete = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deleteEntry = await Entry.findByIdAndDelete(id);
  res.redirect("/show");
  console.log(`Deleted: ${deleteEntry}`);
});

