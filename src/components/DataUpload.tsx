import { useState } from 'react';
import CryptoJS from 'crypto-js';
import { createIpfsClient } from '../services/ipfs';

interface DataUploadProps {
    contract: {
        uploadData: (hash: string) => Promise<void>;
    };
    account: string;
}

const DataUpload = ({ contract, account }: DataUploadProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [password, setPassword] = useState('');
    const [ipfsHash, setIpfsHash] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const encryptAndUpload = async () => {
        if (!file || !password) {
            setError('Please select a file and enter a password');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    const encrypted = CryptoJS.AES.encrypt(
                        reader.result as string,
                        password
                    ).toString();

                    const ipfs = createIpfsClient();
                    const added = await ipfs.add(encrypted);
                    
                    await contract.uploadData(added.path);
                    setIpfsHash(added.path);
                } catch (err) {
                    setError((err as Error).message);
                } finally {
                    setLoading(false);
                }
            };
            reader.readAsText(file);
        } catch (err) {
            setError((err as Error).message);
            setLoading(false);
        }
    };

    return (
        <div className="data-upload" data-testid="data-upload">
            <input 
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                data-testid="file-input"
            />
            <input
                type="password"
                placeholder="Encryption password"
                onChange={(e) => setPassword(e.target.value)}
                data-testid="password-input"
            />
            <button 
                onClick={encryptAndUpload} 
                disabled={loading}
                data-testid="upload-button"
            >
                {loading ? 'Uploading...' : 'Upload & Encrypt'}
            </button>
            {error && <div className="error" data-testid="error-message">{error}</div>}
            {ipfsHash && <div data-testid="ipfs-hash">IPFS Hash: {ipfsHash}</div>}
        </div>
    );
};

export default DataUpload;
