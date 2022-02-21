const { data } = require("../../utils");
const TaskManager = require("../Models/models");

// console.log("data is ", data);
exports.homeGet = async (req, res) => {
  const valid = req.dataValid;
  switch (req.query.search) {
    case "ALL":
      const data = await TaskManager.find({});
      return res.render("index", { data, valid });
      break;
    case "COMPLETED":
      const dataCompleted = await TaskManager.find({ completed: true });
      return res.render("index", { data: dataCompleted, valid });
      break;
    case "DELETED":
      const dataDeleted = await TaskManager.find({ deleted: true });
      return res.render("index", { data: dataDeleted, valid });
      break;
    case "ACTIVE":
      const dataActive = await TaskManager.find({
        deleted: false,
        completed: false,
      });
      return res.render("index", { data: dataActive, valid });
      break;
  }
  const data = await TaskManager.find();
  console.log("data is ", data);

  res.render("index", {
    data: data.reverse(),
    valid: valid,
  });
};
exports.homePost = async (req, res, next) => {
  //   console.log("req.body is ", req.pos);
  console.log("req.body is ", req.body);

  const dataItem = await TaskManager.create({ name: req.body.name });
  if (!dataItem) {
    req.dataValid = "errorInsert";
    return next();
  }
  res.redirect("/");
};

exports.completed = async (req, res, next) => {
  const id = req.params.id;
  const dataItem = await TaskManager.findByIdAndUpdate(
    id,
    { completed: true },
    { new: true }
  );
  if (!dataItem) {
    req.dataValid = "errorUpdate";
    return next();
  }
  res.redirect("/");
};
exports.deleted = async (req, res, next) => {
  const id = req.params.id;
  const data = await TaskManager.findByIdAndUpdate(
    id,
    { deleted: true },
    { new: true }
  );
  if (!data) {
    req.dataValid = "errorDelete";
    return next();
  }
  return res.redirect("/");
};

exports.completeUndo = async (req, res, next) => {
  const id = req.params.id;
  const data = await TaskManager.findByIdAndUpdate(
    id,
    { completed: false },
    { new: true }
  );
  if (!data) {
    req.dataValid = "errorUpdate";
    return next();
  }
  return res.redirect("/");
};
exports.deleteUndo = async (req, res, next) => {
  const id = req.params.id;
  const data = await TaskManager.findByIdAndUpdate(
    id,
    { deleted: false },
    { new: true }
  );
  if (!data) {
    req.dataValid = "errorDelete";
    return next();
  }
  return res.redirect("/");
};
