const Travell = require("./../Models/UserModel/TravellModel");

exports.createTravell = async (req, res) => {
  try {
    const travell = await Travell.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        travell,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAllTravells = async (req, res) => {
  try {
    const travells = await Travell.find();
    res.status(200).json({
      status: "success",
      results: travells.length,
      data: {
        travells,
      },
    });
  } catch (err){
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getTravell = async (req, res) => {
  try {
    const travell = await Travell.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        travell,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateTravell = async (req, res) => {
  try {
    const travell = await Travell.findByIdAndUpdate(req.params);
    res.status(200).json({
      status: "success",
      data: {
        travell,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteTravell = async (req, res) => {
    try {
        await Travell.findByIdAndDelete(req.params.id);
        res.status(204).json({
        status: "success",
        data: null,
        });
    } catch (err) {
        res.status(404).json({
        status: "fail",
        message: err.message,
        });
    }
    };



