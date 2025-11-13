# Token Streaming Frontend

A Next.js frontend for the Stacks Token Streaming protocol with WalletConnect integration.

## Features

- **WalletConnect Support**: Connect mobile wallets securely using WalletConnect protocol
- **Token Streaming**: (Implementation pending - connect to stream.clar contract)

## Getting Started

### Prerequisites

The `.env.local` file is already configured with the WalletConnect project ID:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=6b87a3c69cbd8b52055d7aef763148d6
```

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Next Steps

To complete this frontend, implement:

1. Contract interaction functions in `/lib` directory
2. UI components for creating and managing token streams
3. Integration with the stream.clar smart contract
4. Stream status display and management

## Smart Contract

The smart contract is located at `/contracts/stream.clar` in the parent directory.
