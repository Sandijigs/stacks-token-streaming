# Token Streaming Frontend

A Next.js frontend for the Stacks Token Streaming protocol with WalletConnect integration.

## Features

- **WalletConnect Integration**: Connect mobile wallets securely using WalletConnect SDK v2 (Project ID: 6b87a3c69cbd8b52055d7aef763148d6)
- **Mobile Wallet Support**: Compatible with Xverse, Leather, and other Stacks wallets
- **Token Streaming**: Stream tokens continuously over time with blockchain verification
- **Dual Connection Options**: Stacks Connect for desktop, WalletConnect for mobile

## WalletConnect Integration

This project features full **WalletConnect SDK v2** integration:

### Key Benefits
- **📱 Mobile-Native**: Designed for mobile wallet connections
- **🔒 Secure**: End-to-end encrypted wallet communication
- **⚡ Fast**: QR code scanning for instant pairing
- **🔄 Persistent**: Session management with auto-reconnection
- **🌐 Universal**: Works with all WalletConnect-compatible Stacks wallets

### How It Works
1. User clicks "Connect WalletConnect" button
2. QR code modal appears
3. User scans with mobile wallet (Xverse, Leather, etc.)
4. Wallet approves connection
5. User can now interact with streaming contracts

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
