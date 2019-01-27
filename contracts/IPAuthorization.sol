pragma solidity ^0.4.25;

contract IPAuthorization {
    using SafeMath for *;
    event NewIP(address IPOwner, string name, bytes32 ISBN, uint price);
    address Contract = this;
    function getContractBalance() constant public returns (uint) {
        return Contract.balance;
    }

    struct IP {
        string name;
        uint price;
        bytes32 ISBN;
        address owner;
    }

    mapping(address => mapping(bytes32 => IP)) IPOwnersProduct;
    mapping(address => mapping(bytes32 => IP)) BuyersProduct;

    mapping(address => IP[]) public IPOwnersProductForQuery;
    mapping(address => IP[]) public BuyersProductForQuery;
    mapping(bytes32 => bool) private used;

    function publishIP(string _name, uint _price) public {
        bytes32 ISBN = keccak256(_name);
        require(!used[ISBN], "The IP already exists!");
        require(_price >= 100 wei, "Make your product at least 100 wei!");
        IP memory newIp = IP(_name, _price, ISBN, msg.sender);
        IPOwnersProduct[msg.sender][ISBN] = newIp;
        IPOwnersProductForQuery[msg.sender].push(newIp);
        used[ISBN] = true;
        emit NewIP(msg.sender, _name, ISBN, _price);
    }

    function buyIP(address IPOwner, bytes32 ISBN) payable external isHuman() {
        require(used[ISBN], "The IP is not exists!");
        IP storage ip = IPOwnersProduct[IPOwner][ISBN];
        require(ip.owner != 0x0000000000000000000000000000000000000000, "The author is not exists!");
        require(ip.price == msg.value, "give the right money to author");
        BuyersProduct[msg.sender][ISBN] = ip;
        BuyersProductForQuery[msg.sender].push(ip);
        ip.owner.transfer(msg.value.div(5).mul(4));
    }

    modifier isHuman() {
        address _addr = msg.sender;
        uint256 _codeLength;

        assembly {_codeLength := extcodesize(_addr)}
        require(_codeLength == 0, "sorry humans only");
        _;
    }
}

/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 * change notes:  original SafeMath library from OpenZeppelin modified by Inventor
 * - added sqrt
 * - added sq
 * - added pwr
 * - changed asserts to requires with error log outputs
 */
library SafeMath {

    /**
    * @dev Multiplies two numbers, throws on overflow.
    */
    function mul(uint256 a, uint256 b)
    internal
    pure
    returns (uint256 c)
    {
        if (a == 0) {
            return 0;
        }
        c = a * b;
        require(c / a == b, "SafeMath mul failed");
        return c;
    }

    /**
    * @dev Integer division of two numbers, truncating the quotient.
    */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0); // Solidity only automatically asserts when dividing by 0
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    /**
    * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
    */
    function sub(uint256 a, uint256 b)
    internal
    pure
    returns (uint256)
    {
        require(b <= a, "SafeMath sub failed");
        return a - b;
    }

    /**
    * @dev Adds two numbers, throws on overflow.
    */
    function add(uint256 a, uint256 b)
    internal
    pure
    returns (uint256 c)
    {
        c = a + b;
        require(c >= a, "SafeMath add failed");
        return c;
    }

    /**
     * @dev gives square root of given x.
     */
    function sqrt(uint256 x)
    internal
    pure
    returns (uint256 y)
    {
        uint256 z = ((add(x,1)) / 2);
        y = x;
        while (z < y)
        {
            y = z;
            z = ((add((x / z),z)) / 2);
        }
    }

    /**
     * @dev gives square. multiplies x by x
     */
    function sq(uint256 x)
    internal
    pure
    returns (uint256)
    {
        return (mul(x,x));
    }

    /**
     * @dev x to the power of y
     */
    function pwr(uint256 x, uint256 y)
    internal
    pure
    returns (uint256)
    {
        if (x==0)
            return (0);
        else if (y==0)
            return (1);
        else
        {
            uint256 z = x;
            for (uint256 i=1; i < y; i++)
                z = mul(z,x);
            return (z);
        }
    }

    /**
    * @dev Divides two numbers and returns the remainder (unsigned integer modulo),
    * reverts when dividing by zero.
    */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0);
        return a % b;
    }
}
