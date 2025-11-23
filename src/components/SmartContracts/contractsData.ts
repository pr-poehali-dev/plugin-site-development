export interface Contract {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  code: string;
}

export interface GuideSection {
  title: string;
  content: string;
  points: string[];
}

export const contracts: Contract[] = [
  {
    id: 'flash-usdt',
    title: 'Flash USDT TRC20',
    description: 'Контракт Flash USDT для сети TRON',
    difficulty: 'Средний',
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FlashUSDT {
    string public name = "Flash USDT";
    string public symbol = "FUSDT";
    uint8 public decimals = 6;
    uint256 public totalSupply;
    
    address public owner;
    uint256 public flashFee = 100; // 1% комиссия
    uint256 public constant FEE_DENOMINATOR = 10000;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => bool) public isFlashToken;
    mapping(address => uint256) public flashExpiry;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event FlashMint(address indexed to, uint256 amount, uint256 expiry);
    event FlashBurn(address indexed from, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    constructor(uint256 _initialSupply) {
        owner = msg.sender;
        totalSupply = _initialSupply * 10 ** uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
    }
    
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(_to != address(0), "Invalid address");
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        
        if (isFlashToken[msg.sender] && block.timestamp > flashExpiry[msg.sender]) {
            _burnFlash(msg.sender);
            return false;
        }
        
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        
        if (isFlashToken[msg.sender]) {
            isFlashToken[_to] = true;
            flashExpiry[_to] = flashExpiry[msg.sender];
        }
        
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    function approve(address _spender, uint256 _value) public returns (bool) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        require(_to != address(0), "Invalid address");
        require(_value <= balanceOf[_from], "Insufficient balance");
        require(_value <= allowance[_from][msg.sender], "Allowance exceeded");
        
        if (isFlashToken[_from] && block.timestamp > flashExpiry[_from]) {
            _burnFlash(_from);
            return false;
        }
        
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        
        if (isFlashToken[_from]) {
            isFlashToken[_to] = true;
            flashExpiry[_to] = flashExpiry[_from];
        }
        
        emit Transfer(_from, _to, _value);
        return true;
    }
    
    function flashMint(address _to, uint256 _amount, uint256 _duration) public onlyOwner returns (bool) {
        require(_to != address(0), "Invalid address");
        require(_amount > 0, "Amount must be greater than 0");
        require(_duration > 0, "Duration must be greater than 0");
        
        uint256 fee = (_amount * flashFee) / FEE_DENOMINATOR;
        uint256 mintAmount = _amount - fee;
        
        balanceOf[_to] += mintAmount;
        balanceOf[owner] += fee;
        totalSupply += _amount;
        
        isFlashToken[_to] = true;
        flashExpiry[_to] = block.timestamp + _duration;
        
        emit FlashMint(_to, mintAmount, flashExpiry[_to]);
        emit Transfer(address(0), _to, mintAmount);
        emit Transfer(address(0), owner, fee);
        
        return true;
    }
    
    function burnFlash(address _account) public onlyOwner returns (bool) {
        return _burnFlash(_account);
    }
    
    function _burnFlash(address _account) private returns (bool) {
        require(isFlashToken[_account], "Not a flash token holder");
        
        uint256 amount = balanceOf[_account];
        if (amount > 0) {
            balanceOf[_account] = 0;
            totalSupply -= amount;
            emit FlashBurn(_account, amount);
            emit Transfer(_account, address(0), amount);
        }
        
        isFlashToken[_account] = false;
        flashExpiry[_account] = 0;
        
        return true;
    }
    
    function setFlashFee(uint256 _newFee) public onlyOwner {
        require(_newFee <= 1000, "Fee too high"); // Максимум 10%
        flashFee = _newFee;
    }
    
    function checkFlashStatus(address _account) public view returns (bool isFlash, uint256 expiry, bool isExpired) {
        isFlash = isFlashToken[_account];
        expiry = flashExpiry[_account];
        isExpired = isFlash && block.timestamp > expiry;
    }
}`
  },
  {
    id: 'erc20',
    title: 'ERC-20 Token',
    description: 'Стандартный токен на Ethereum',
    difficulty: 'Начальный',
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC20Token {
    string public name = "MyToken";
    string public symbol = "MTK";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply * 10 ** uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
    }
    
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from], "Insufficient balance");
        require(_value <= allowance[_from][msg.sender], "Allowance exceeded");
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}`
  },
  {
    id: 'multisig',
    title: 'Multi-Signature Wallet',
    description: 'Кошелёк с множественными подписями',
    difficulty: 'Средний',
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultiSigWallet {
    event Deposit(address indexed sender, uint amount);
    event Submit(uint indexed txId);
    event Approve(address indexed owner, uint indexed txId);
    event Revoke(address indexed owner, uint indexed txId);
    event Execute(uint indexed txId);

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
    }

    address[] public owners;
    mapping(address => bool) public isOwner;
    uint public required;

    Transaction[] public transactions;
    mapping(uint => mapping(address => bool)) public approved;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }

    modifier txExists(uint _txId) {
        require(_txId < transactions.length, "tx does not exist");
        _;
    }

    modifier notApproved(uint _txId) {
        require(!approved[_txId][msg.sender], "tx already approved");
        _;
    }

    modifier notExecuted(uint _txId) {
        require(!transactions[_txId].executed, "tx already executed");
        _;
    }

    constructor(address[] memory _owners, uint _required) {
        require(_owners.length > 0, "owners required");
        require(_required > 0 && _required <= _owners.length, "invalid required number");

        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner is not unique");
            
            isOwner[owner] = true;
            owners.push(owner);
        }
        required = _required;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function submit(address _to, uint _value, bytes calldata _data) external onlyOwner {
        transactions.push(Transaction({
            to: _to,
            value: _value,
            data: _data,
            executed: false
        }));
        emit Submit(transactions.length - 1);
    }

    function approve(uint _txId) external onlyOwner txExists(_txId) notApproved(_txId) notExecuted(_txId) {
        approved[_txId][msg.sender] = true;
        emit Approve(msg.sender, _txId);
    }

    function getApprovalCount(uint _txId) private view returns (uint count) {
        for (uint i = 0; i < owners.length; i++) {
            if (approved[_txId][owners[i]]) {
                count += 1;
            }
        }
    }

    function execute(uint _txId) external txExists(_txId) notExecuted(_txId) {
        require(getApprovalCount(_txId) >= required, "approvals < required");
        Transaction storage transaction = transactions[_txId];
        transaction.executed = true;
        (bool success, ) = transaction.to.call{value: transaction.value}(transaction.data);
        require(success, "tx failed");
        emit Execute(_txId);
    }

    function revoke(uint _txId) external onlyOwner txExists(_txId) notExecuted(_txId) {
        require(approved[_txId][msg.sender], "tx not approved");
        approved[_txId][msg.sender] = false;
        emit Revoke(msg.sender, _txId);
    }
}`
  },
  {
    id: 'nft',
    title: 'NFT (ERC-721)',
    description: 'Контракт для создания NFT',
    difficulty: 'Начальный',
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleNFT {
    string public name = "MyNFT";
    string public symbol = "MNFT";
    
    uint256 private _tokenIdCounter;
    
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(uint256 => string) private _tokenURIs;
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    
    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "Invalid address");
        return _balances[owner];
    }
    
    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "Token does not exist");
        return owner;
    }
    
    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_owners[tokenId] != address(0), "Token does not exist");
        return _tokenURIs[tokenId];
    }
    
    function mint(address to, string memory uri) public returns (uint256) {
        require(to != address(0), "Invalid address");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _balances[to]++;
        _owners[tokenId] = to;
        _tokenURIs[tokenId] = uri;
        
        emit Transfer(address(0), to, tokenId);
        return tokenId;
    }
    
    function transfer(address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        require(to != address(0), "Invalid address");
        
        _balances[msg.sender]--;
        _balances[to]++;
        _owners[tokenId] = to;
        
        emit Transfer(msg.sender, to, tokenId);
    }
    
    function approve(address to, uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        require(msg.sender == owner, "Not token owner");
        
        _tokenApprovals[tokenId] = to;
        emit Approval(owner, to, tokenId);
    }
    
    function getApproved(uint256 tokenId) public view returns (address) {
        require(_owners[tokenId] != address(0), "Token does not exist");
        return _tokenApprovals[tokenId];
    }
}`
  }
];

export const guide: GuideSection[] = [
  {
    title: '1. Основы Solidity',
    content: 'Solidity — это объектно-ориентированный язык программирования для написания смарт-контрактов на блокчейне Ethereum и других совместимых платформах.',
    points: [
      'Статическая типизация',
      'Поддержка наследования',
      'Библиотеки и интерфейсы',
      'Модификаторы доступа'
    ]
  },
  {
    title: '2. Структура контракта',
    content: 'Каждый смарт-контракт начинается с указания лицензии и версии компилятора:',
    points: [
      '// SPDX-License-Identifier: MIT',
      'pragma solidity ^0.8.0;',
      'contract MyContract { ... }',
      'Переменные состояния, функции, модификаторы'
    ]
  },
  {
    title: '3. Типы данных',
    content: 'Solidity поддерживает различные типы данных:',
    points: [
      'uint / int - целые числа',
      'address - адреса Ethereum',
      'bool - логический тип',
      'string / bytes - строки и байты',
      'mapping - ассоциативные массивы',
      'struct - пользовательские структуры'
    ]
  },
  {
    title: '4. Функции и модификаторы',
    content: 'Функции определяют логику контракта:',
    points: [
      'function name() public view returns (type)',
      'Видимость: public, private, internal, external',
      'Модификаторы: view, pure, payable',
      'Кастомные модификаторы для проверок'
    ]
  },
  {
    title: '5. События (Events)',
    content: 'События позволяют логировать действия в блокчейне:',
    points: [
      'event Transfer(address indexed from, address indexed to, uint256 value);',
      'emit Transfer(msg.sender, recipient, amount);',
      'Используются для отслеживания транзакций',
      'Индексированные параметры для фильтрации'
    ]
  },
  {
    title: '6. Безопасность',
    content: 'Важные принципы безопасности при написании контрактов:',
    points: [
      'Checks-Effects-Interactions паттерн',
      'Защита от reentrancy атак',
      'Проверка переполнения (overflow/underflow)',
      'Валидация входных данных',
      'Использование OpenZeppelin библиотек'
    ]
  },
  {
    title: '7. Развёртывание',
    content: 'Процесс деплоя контракта в блокчейн:',
    points: [
      'Компиляция с помощью Remix, Hardhat или Truffle',
      'Подключение к сети (mainnet, testnet)',
      'Оплата газа за развёртывание',
      'Верификация кода на Etherscan',
      'Тестирование перед mainnet'
    ]
  }
];
