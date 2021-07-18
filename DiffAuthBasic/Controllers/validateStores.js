const yup = require("yup");

const addStore = yup.object().shape({
  name: yup.string().required(),
  cuit: yup.string().required(),
  concepts: yup.array().of(yup.string()),
  currentBalance: yup.number(),
  active: yup.boolean().required(),
  lastSale: yup.date(),
});

module.exports = addStore;
