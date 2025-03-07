const hre = require("hardhat");

async function main() {
  const Microinsurance = await hre.ethers.getContractFactory("Microinsurance");
  const microinsurance = await Microinsurance.deploy();

  await microinsurance.waitForDeployment();
  console.log("Microinsurance contract deployed to:", await microinsurance.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
