pragma solidity ^0.7.5;

contract SafeMath {
    function safeAdd(uint a, uint b) public pure returns (uint c) {
        c = a + b;
        require(c >= a,"C should be greater or equal to a");
        return c;
    }
    function safeSub(uint a, uint b) public pure returns (uint c) {
        require(b <= a,"B should be less or equal to a");
        c = a - b;
        return c;
    }
    function safeMul(uint a, uint b) public pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b,"a should be equal to 0 or c/a should be equal to b");
        return c;
    }
    function safeDiv(uint a, uint b) public pure returns (uint c) {
        require(b > 0,"b should be greater than 0");
        c = a / b;
        return c;
    }
}