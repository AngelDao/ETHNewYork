## Install

To install dependencies and compile contracts:

```bash
yarn install
yarn build
```

### Javascript Tests

```
yarn test
```

### Foundry Tests

Seaport also includes a suite of fuzzing tests written in solidity with Foundry.

To install Foundry (assuming a Linux or macOS system):

```bash
curl -L https://foundry.paradigm.xyz | bash
```

This will download foundryup. To start Foundry, run:

```bash
foundryup
```

To install dependencies:

```
git submodule update --init --recursive
```

```bash
FOUNDRY_PROFILE=lite forge test # with 1000 fuzz runs
```
