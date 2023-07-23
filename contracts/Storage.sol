// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "./StorageSlot.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

contract Storage {
    // uint256 x = 97; //0x0
    // uint256 y = 56; //0x1

    // mapping (uint => uint) test; //0x2 
    // constructor() {
    //     // keccak256(11 + 0x2)
    //     test[11] = 1;
    //     // keccak256(22 + 0x2)
    //     test[22] = 10;
    //     // keccak256(33 + 0x2)
    //     test[33] = 20;
    // }

    constructor() {
        StorageSlot.getUint256Slot(keccak256("beidi")).value = 16;
    }

    function  check () external view{
        console.log(StorageSlot.getUint256Slot(keccak256("beidi")).value);
    }
}
