const Stores = require("../models/store");
const schemaValidator = require("./validateStores");

exports.getAllStores = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 3;
    const allStores = await Stores.find({});
    const paginatedAllStores = await Stores.find({})
      .skip((page - 1) * limit)
      .limit(limit * 1)
      .exec();
    const totalObjects = Object.keys(allStores).length;
    const totalPages = totalObjects / parseInt(limit);
    res.json({
      data: [paginatedAllStores], //comercios con el formato mostrado anteriormente
      page: page,
      pages: Math.ceil(totalPages),
      limit: limit,
      total: totalObjects,
    });
    res.status(200);
  } catch (error) {
    res.status(404);
    res.json(error);
    next();
  }
};

exports.addStores = async (req, res, next) => {
  try {
    const validateData = await schemaValidator.isValid(req.body, {
      abortEarly: false,
    });
    if (validateData) {
      const store = await new Stores(req.body);
      store.save();
      res.status(201);
      res.send("Store added succesfully");
    } else {
      res.send("Store not valid");
      res.status(400);
      next();
    }
  } catch (error) {
    res.status(404);
    res.json(error);
    next();
  }
};
