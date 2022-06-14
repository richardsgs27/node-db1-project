const Account = require("./accounts-model");

function checkAccountPayload(req, res, next) {
  let { name, budget } = req.body;
  if (name === undefined || budget === undefined) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
  } else if (typeof budget != "number" || isNaN(budget)) {
    res.status(400).json({ message: "must be a number" });
  } else if (Number(budget) < 0 || Number(budget) > 1000000) {
    res.status(400).json({ message: "too large or too small" });
  } else {
    next();
  }
}

async function checkAccountNameUnique(req, res, next) {
  try {
    const existingAccount = await Account.getByName(req.body.name);
    if (!existingAccount) {
      next();
    } else {
      res.status(400).json({ message: "name is taken" });
    }
  } catch (err) {
    next(err);
  }
}

async function checkAccountId(req, res, next) {
  try {
    const account = await Account.getById(req.params.id);
    if (!account) {
      res.status(404).json({ message: "account not found" });
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
};