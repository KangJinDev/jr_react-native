import * as cv from "../services/caesarVision";

export const auth = async (req, res) => {
  const { pin } = req.body;
  try {
    const response = await cv.authorize(pin);
    res.json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const log = async (req, res) => {
  const { logs } = req.body;
  try {
    const response = await cv.log(logs);
    res.json(response);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
