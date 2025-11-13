"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Client from "@walletconnect/sign-client";
import type { SessionTypes } from "@walletconnect/types";
import QRCodeModal from "@walletconnect/qrcode-modal";

type SignClientType = Awaited<ReturnType<typeof Client.init>>;

interface WalletConnectContextType {
  client: SignClientType | undefined;
  session: SessionTypes.Struct | undefined;
  chain: string | undefined;
  address: string | undefined;
  connectWalletConnect: (selectedChain: string) => Promise<void>;
  disconnectWalletConnect: () => Promise<void>;
  isConnected: boolean;
}

const WalletConnectContext = createContext<WalletConnectContextType>({
  client: undefined,
  session: undefined,
  chain: undefined,
  address: undefined,
  connectWalletConnect: async () => {},
  disconnectWalletConnect: async () => {},
  isConnected: false,
});

export const useWalletConnect = () => useContext(WalletConnectContext);

export function WalletConnectProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<SignClientType | undefined>(undefined);
  const [session, setSession] = useState<SessionTypes.Struct | undefined>(undefined);
  const [chain, setChain] = useState<string | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initClient = async () => {
      try {
        const c = await Client.init({
          logger: "error",
          relayUrl: "wss://relay.walletconnect.com",
          projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
          metadata: {
            name: "Token Streaming",
            description: "Stacks Token Streaming with WalletConnect",
            url: "https://your-app-url.com/",
            icons: ["https://cryptologos.cc/logos/stacks-stx-logo.png"],
          },
        });
        setClient(c);
      } catch (error) {
        console.error("Failed to initialize WalletConnect client:", error);
      }
    };

    if (!client) {
      initClient();
    }
  }, [client]);

  const connectWalletConnect = async (selectedChain: string) => {
    if (!client) {
      throw new Error("WalletConnect client not initialized");
    }

    try {
      const result = await client.connect({
        pairingTopic: undefined,
        requiredNamespaces: {
          stacks: {
            methods: [
              "stacks_signMessage",
              "stacks_stxTransfer",
              "stacks_contractCall",
              "stacks_contractDeploy",
            ],
            chains: [selectedChain],
            events: [],
          },
        },
      });
      const { uri, approval } = result;

      if (uri) {
        QRCodeModal.open(uri, () => {});
      }

      const newSession = await approval();
      setSession(newSession);
      setChain(selectedChain);
      const addr = newSession.namespaces.stacks?.accounts[0]?.split(":")[2];
      setAddress(addr);

      QRCodeModal.close();
    } catch (error) {
      console.error("Failed to connect WalletConnect:", error);
      QRCodeModal.close();
      throw error;
    }
  };

  const disconnectWalletConnect = async () => {
    if (client && session) {
      try {
        await client.disconnect({
          topic: session.topic,
          reason: { code: 6000, message: "User disconnected" },
        });
      } catch (error) {
        console.error("Failed to disconnect WalletConnect:", error);
      }
    }

    setSession(undefined);
    setChain(undefined);
    setAddress(undefined);
  };

  return (
    <WalletConnectContext.Provider
      value={{
        client,
        session,
        chain,
        address,
        connectWalletConnect,
        disconnectWalletConnect,
        isConnected: !!session,
      }}
    >
      {children}
    </WalletConnectContext.Provider>
  );
}
