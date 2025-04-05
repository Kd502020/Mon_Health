import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const AccessControl = ({ contract, account }) => {
    const [grantAddress, setGrantAddress] = useState('');
    const [accessList, setAccessList] = useState<string[]>([]);

    const grantAccess = async () => {
        if (!ethers.utils.isAddress(grantAddress)) return;
        try {
            await contract.grantAccess(account, grantAddress);
            setAccessList([...accessList, grantAddress]);
        } catch (error) {
            console.error('Error granting access:', error);
        }
    };

    const revokeAccess = async (address: string) => {
        try {
            await contract.revokeAccess(account, address);
            setAccessList(accessList.filter(addr => addr !== address));
        } catch (error) {
            console.error('Error revoking access:', error);
        }
    };

    return (
        <div className="access-control">
            <div>
                <input
                    type="text"
                    placeholder="Address to grant access"
                    onChange={(e) => setGrantAddress(e.target.value)}
                />
                <button onClick={grantAccess}>Grant Access</button>
            </div>
            <div className="access-list">
                {accessList.map(address => (
                    <div key={address}>
                        {address}
                        <button onClick={() => revokeAccess(address)}>
                            Revoke
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccessControl;
