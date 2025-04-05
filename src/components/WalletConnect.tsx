import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletConnect = () => {
    const [account, setAccount] = useState<string>('');
    const [connected, setConnected] = useState(false);

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);
                setConnected(true);
            } catch (error) {
                console.error('Error connecting wallet:', error);
            }
        }
    };

    return (
        <div className="wallet-connect">
            {!connected ? (
                <button onClick={connectWallet}>Connect Wallet</button>
            ) : (
                <div>Connected: {account}</div>
            )}
        </div>
    );
};

export default WalletConnect;
