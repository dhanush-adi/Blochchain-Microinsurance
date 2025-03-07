import { ethers } from "ethers";
import contractABI from "./contracts/Microinsurance.json";

// Load environment variables
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL as string;

// Ethereum Provider
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

// Function to get contract with signer
const getContractWithSigner = async () => {
  if (typeof window.ethereum === "undefined") {
    throw new Error("MetaMask is not installed");
  }
  const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
};

// Function to buy an insurance policy
export const buyPolicy = async (
  farmer: string,
  coverageAmount: number,
  premiumAmount: number,
  duration: number
) => {
  try {
    const contract = await getContractWithSigner();
    const tx = await contract.createPolicy(farmer, coverageAmount, premiumAmount, duration);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error("Error buying policy:", error);
    throw error;
  }
};

// Function to check if a policy exists
export const checkPolicyExists = async (farmer: string) => {
  try {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, provider);
    return await contract.checkPolicyExists(farmer);
  } catch (error) {
    console.error("Error checking policy:", error);
    throw error;
  }
};

// Function to file a claim
export const fileClaim = async (policyId: number) => {
  try {
    const contract = await getContractWithSigner();
    const tx = await contract.fileClaim(policyId);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error("Error filing claim:", error);
    throw error;
  }
};
