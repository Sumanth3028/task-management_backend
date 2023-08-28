const tasks = require("../Models/task");

exports.getTaskDetails = async (req, res, next) => {
  try {
    const task = await tasks.findAll({ where: { userId: req.user.userId } });
    res.status(200).json({ task });
  } catch (err) {
  }
};

exports.postTaskDetails = async (req, res, next) => {
  try {
    const title = req.body.title;

    const description = req.body.description;

    const userId = req.user;

    const data = await tasks.create({
      title: title,
      description: description,
      userId: req.user.userId,
    });

    res.status(201).json({ data });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
exports.markedAsComplete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const marked = await tasks.findOne({ where: { id: id } });
    marked.update({ markedascomplete: true });
    res.status(200).json({ success: true, message: "completed successfully" });
  } catch (err) {
    return err;
  }
};

exports.deleteTasks = async (req, res, next) => {
  try {
    const id = req.params.id;
    const mem = await tasks.destroy({ where: { id: id } });
    res.status(200).json({ success: true, message: "completed successfully" });
  } catch (err) {
    return err;
  }
};

exports.editTasks = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedtitle = req.body.title;
    const updateddesc = req.body.description;
    const marked = await tasks.findOne({ where: { id: id } });

    const updated = await marked.update({
      title: updatedtitle,
      description: updateddesc,
    });
    res.status(200).json({ updated : updated  });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
