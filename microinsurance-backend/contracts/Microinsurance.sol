// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Microinsurance {
    address public owner;
    uint256 public policyCount;

    struct Policy {
        uint256 id;
        address farmer;
        uint256 coverageAmount;
        uint256 premiumAmount;
        uint256 expiry;
        bool claimed;
    }

    mapping(address => Policy) public policies;

    event PolicyCreated(uint256 policyId, address farmer, uint256 amount);
    event ClaimFiled(uint256 policyId, address farmer);
    event FundsWithdrawn(address to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier policyExists(address _farmer) {
        require(policies[_farmer].id != 0, "No active policy");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createPolicy(
        address _farmer,
        uint256 _coverageAmount,
        uint256 _premiumAmount,
        uint256 _duration
    ) external payable {
        require(msg.value == _premiumAmount, "Incorrect premium amount");
        require(policies[_farmer].id == 0, "Policy already exists");

        policyCount++;
        policies[_farmer] = Policy(
            policyCount,
            _farmer,
            _coverageAmount,
            _premiumAmount,
            block.timestamp + _duration,
            false
        );

        emit PolicyCreated(policyCount, _farmer, _coverageAmount);
    }

    function fileClaim() external policyExists(msg.sender) {
        Policy storage policy = policies[msg.sender];
        require(block.timestamp < policy.expiry, "Policy expired");
        require(!policy.claimed, "Already claimed");

        policy.claimed = true;
        payable(msg.sender).transfer(policy.coverageAmount);

        emit ClaimFiled(policy.id, msg.sender);
    }

    function withdrawFunds(address _to, uint256 _amount) external onlyOwner {
        require(address(this).balance >= _amount, "Insufficient balance");
        payable(_to).transfer(_amount);
        emit FundsWithdrawn(_to, _amount);
    }

    function getPolicy(address _farmer) external view returns (Policy memory) {
        return policies[_farmer];
    }

    receive() external payable {}
}
