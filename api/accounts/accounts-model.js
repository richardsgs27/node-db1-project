const db = require("../../data/db-config");

function getAll() {
  return db("accounts");
}

function getByName(name) {
  return db("accounts").where("name", name).first();
}

function getById(id) {
  return db("accounts").where("id", id).first();
}

async function create({ name, budget }) {
  let [id] = await db("accounts").insert({ name: name, budget: budget });
  return getById(id);
}

async function updateById(id, { name, budget }) {
  await db("accounts").where("id", id).update({ name: name, budget: budget });
  return getById(id);
}

function deleteById(id) {
  return db("accounts").where("id", id).del();
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
};
