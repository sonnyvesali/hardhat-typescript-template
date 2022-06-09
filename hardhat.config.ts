import 'dotenv/config';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-deploy';
import 'hardhat-watcher';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import { HardhatUserConfig } from 'hardhat/config';
import { removeConsoleLog } from 'hardhat-preprocessor';
import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

// const accounts = {
//   mniumonic: process.env.MNEUMONIC || '',
// };

const MNEMONIC = process.env.MNEMONIC || '';
const FORKING = process.env.FORKING || '';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || '';
const REPORT_GAS = process.env.REPORT_GAS || '';
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || '';
const ROPSTEN_RPC_URL = process.env.ROPSTEN_RPC_URL || '';
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || ''; // ✅
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || '';
const KOVAN_RPC_URL = process.env.KOVAN_RPC_URL || '';
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL || '';

const accounts = {
  mnemonic:
    MNEMONIC || 'test test test test test test test test test test test junk',
};

const namedAccounts = {
  deployer: {
    default: 0,
  },
  admin: {
    default: 1,
  },
  dev: {
    default: 2,
  },
  owner: {
    default: 3,
  },
  wallet: {
    default: 4,
  },
  beneficiary1: {
    default: 5,
  },
  beneficiary2: {
    default: 6,
  },
  user: {
    default: 7,
  },
};

export type Signers = {
  [name in keyof typeof namedAccounts]: SignerWithAddress;
};

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    coinmarketcap: COINMARKETCAP_API_KEY,
    currency: 'USD',
    enabled: process.env.REPORT_GAS === 'false',
  },
  namedAccounts,
  networks: {
    hardhat: {
      forking: {
        enabled: FORKING === 'true',
        url: MAINNET_RPC_URL,
      },
      live: false,
      saveDeployments: true,
      tags: ['test', 'local'],
      gasPrice: 0,
      initialBaseFeePerGas: 0,
      chainId: 31337,
    },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts,
      saveDeployments: true,
      chainId: 4,
    },
    ropsten: {
      url: ROPSTEN_RPC_URL,
      accounts,
      chainId: 3,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
      gasMultiplier: 15,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts,
      chainId: 5,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
      gasMultiplier: 15,
    },
    kovan: {
      url: KOVAN_RPC_URL,
      accounts,
      chainId: 42,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
      gasMultiplier: 10,
    },
    polygon: {
      url: POLYGON_RPC_URL,
      accounts,
      chainId: 137,
      live: true,
      saveDeployments: true,
      gasMultiplier: 2,
    },
    ethMainnet: {
      url: MAINNET_RPC_URL,
      accounts,
      chainId: 1,
    },
    localhost: {
      live: false,
      saveDeployments: true,
      tags: ['local'],
    },
  },
  preprocess: {
    eachLine: removeConsoleLog(
      (bre) =>
        bre.network.name !== 'hardhat' && bre.network.name !== 'localhost'
    ),
  },
  solidity: {
    compilers: [
      {
        version: '0.6.12',
      },
      {
        version: '0.7.3',
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  watcher: {
    compile: {
      tasks: ['compile'],
      files: ['./contracts'],
      verbose: true,
    },
  },
};

export default config;
