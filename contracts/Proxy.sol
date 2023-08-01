// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

// Uncomment this line to use console.log
import "./StorageSlot.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

// EOA -> Proxy -> Logic1
//              -> Logic2
contract Proxy {
  uint x = 0;
  address implementation;

  function changeImplementation(address _implementation) external {
    implementation = _implementation;
  }

  fallback() external {
    (bool success,) =  implementation.delegatecall(msg.data);
    require(success, "External call failed");
  }

  // function changeX(uint _x) external {
  //   Logic1(implementation).changeX(_x);
  // }
}


contract Logic1 {
  uint x = 0;

  function changeX(uint _x) external {
    x = _x;
  }
}

contract Logic2 {
  uint x = 0;

  function changeX(uint _x) external {
    x = _x;
  }

  function tripleX() external {
    x = x * 3;
  }
}


