"use client";

import { useWalletConnect } from "@/contexts/WalletConnectContext";

export default function Home() {
  const { address, isConnected, connectWalletConnect, disconnectWalletConnect } = useWalletConnect();

  const handleConnect = async () => {
    try {
      await connectWalletConnect("stacks:2147483648");
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full items-center justify-between text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Token Streaming DApp</h1>
        <div className="text-center mb-8">
          <p className="mb-4">WalletConnect Integration Enabled</p>
          
          {isConnected && address ? (
            <div className="space-y-4">
              <p className="text-green-400">Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
              <button
                onClick={disconnectWalletConnect}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Disconnect
              </button>
              <div className="mt-8 p-4 bg-gray-800 rounded">
                <p className="text-sm text-gray-400">
                  Contract interaction UI would be implemented here.
                  <br />
                  Refer to stream.clar for available functions.
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={handleConnect}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Connect with WalletConnect
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
