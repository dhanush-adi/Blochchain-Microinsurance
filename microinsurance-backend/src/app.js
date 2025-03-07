require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const contractABI = require("./contracts/Microinsurance.json").abi;

const app = express();
app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

app.post("/api/buy-policy", async (req, res) => {
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

app.post("/api/file-claim", async (req, res) => {
  try {
    const tx = await contract.fileClaim();
    await tx.wait();
    res.json({ message: "Claim filed successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/check-policy/:farmer", async (req, res) => {
  try {
    const policy = await contract.getPolicy(req.params.farmer);
    res.json(policy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
