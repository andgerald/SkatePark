import { skatersModel } from "../models/index.js";

const findAll = async (req, res) => {
  try {
    const skaters = await skatersModel.findAll();
    res.status(200).send(skaters);
  } catch (e) {
    res.status(500).send({
      error: `Algo salió mal... ${e}`,
      code: 500,
    });
  }
};

const home = async (req, res) => {
  try {
    const skaters = await skatersModel.findAll();
    res.render("Home", { skaters });
  } catch (e) {
    res.status(500).send({
      error: `Algo salió mal... ${e}`,
      code: 500,
    });
  }
};

export const skatersController = {
  findAll,
  home,
};
