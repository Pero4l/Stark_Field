"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";

// Add type for props
type ButtonProps = {
  onClose?: () => void;
};
// import ThemeToggle from '../toggle'


import {
  Connector,
  useAccount,
  useConnect,
  useDisconnect,
} from '@starknet-react/core';
import { StarknetkitConnector, useStarknetkitConnectModal } from 'starknetkit';

const Button = ({ onClose }: ButtonProps) => {

  const { connect, connectors } = useConnect();

  
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors as StarknetkitConnector[],
  });


  const {account, isConnected, address} = useAccount();

  async function connectWallet() {
    const { connector } = await starknetkitConnectModal();
    if (!connector) {
      return;
    }
    await connect({ connector: connector as Connector });
  }

  return (
    <div>
      {/* <ThemeToggle/> */}

      {/* BUTTONS */}
      <div className="flex  justify-center left-5 lg:flex relative lg:left-10">
        {/* <Link
          href="/auth/register"
          className="bg-green-600 text-white lg:px-12 lg:w-fit md:px-32 px-12 py-3 rounded-l-full hover:bg-green-700 transition"
          onClick={onClose}s
        >
          Sign Up
        </Link> */}
       {isConnected ?  <button
          className="border border-red-600 text-red-600 lg:px-12 lg:w-fit md:px-32 px-10 py-3 font-bold rounded-full hover:bg-red-600 hover:text-white transition bg-white relative md:right-4 lg:right-7 right-7"
        
        >
          Disconnect Wallet
        </button> : <button
          className="border border-green-600 text-green-600 lg:px-12 lg:w-fit md:px-32 px-10 py-3 font-bold rounded-full hover:bg-green-600 hover:text-white transition bg-white relative md:right-4 lg:right-7 right-7"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>}
      </div>
    </div>
  );
};

export default Button;
