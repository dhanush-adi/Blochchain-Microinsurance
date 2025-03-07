const express = require("express");
const router = express.Router();
const { contract } = require("../blockchain");

router.post("/buy-policy", async (req, res) => {
  try {
    const { farmer, coverageAmount, premiumAmount, duration } = req.body;
    const tx = await contract.createPolicy(farmer, coverageAmount, premiumAmount, duration, {
      value: premiumAmount,
    });
    await tx.wait();
    res.json({ message: "Policy purchased successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/file-claim", async (req, res) => {
  try {
    const tx = await contract.fileClaim();
    await tx.wait();
    res.json({ message: "Claim filed successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/check-policy/:farmer", async (req, res) => {
  try {
    const policy = await contract.getPolicy(req.params.farmer);
    res.json(policy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
