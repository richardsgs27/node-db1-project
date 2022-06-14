const express = require("express");
const Account = require("./accounts-model");
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require("./accounts-middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allAccounts = await Account.getAll();
    res.status(201).json(allAccounts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkAccountId, async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id);
    res.status(201).json(account);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    let { name, budget } = req.body;
    let trimmedName = name.trim();
    try {
      const newAccount = await Account.create({
        name: trimmedName,
        budget: budget,
      });
      res.status(201).json(newAccount);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const updatedAccount = await Account.updateById(req.params.id, req.body);
      res.status(200).json(updatedAccount);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", checkAccountId, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id);
    res.json(req.account);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {//eslint-disable-line
  res
    .status(err.status || 500)
    .json({ message: err.message, stack: err.stack });
});

module.exports = router;