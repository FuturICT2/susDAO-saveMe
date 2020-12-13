# FIN4OracleEngine
Provides trusted links to sensors, aggregates sensor data and acts as FIN4Xplorer-user to approve claims

## Setup

### `config.json`

```json
{
    "Fin4OracleHubAddress": "",
    "INFURA_API_KEY": "",
    "ORACLE_ACCOUNT": {
        "MNEMONIC": "",
        "PRIVATE_KEY": ""
    }
}
```

### `Fin4OracleHub.json`

The result of running `truffle compile` on `Fin4OracleHub.sol` must be copied into this folder.
