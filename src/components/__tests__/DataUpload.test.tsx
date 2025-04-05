import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom';
import DataUpload from '../DataUpload';

// Mock the IPFS service correctly with jest
jest.mock('../../services/ipfs', () => ({
    createIpfsClient: () => ({
        add: jest.fn().mockResolvedValue({ path: 'mockIpfsHash123' })
    })
}));

describe('DataUpload', () => {
    const mockContract = {
        uploadData: jest.fn().mockResolvedValue(undefined)
    };
    const mockAccount = '0x123';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render upload form', () => {
        render(<DataUpload contract={mockContract} account={mockAccount} />);
        expect(screen.getByTestId('file-input')).toBeInTheDocument();
        expect(screen.getByTestId('password-input')).toBeInTheDocument();
        expect(screen.getByTestId('upload-button')).toBeInTheDocument();
    });

    it('should handle file upload', async () => {
        render(<DataUpload contract={mockContract} account={mockAccount} />);
        
        const file = new File(['test'], 'test.txt', { type: 'text/plain' });
        const fileInput = screen.getByTestId('file-input');

        await act(async () => {
            fireEvent.change(fileInput, { target: { files: [file] } });
            fireEvent.change(screen.getByTestId('password-input'), {
                target: { value: 'test123' }
            });
            fireEvent.click(screen.getByTestId('upload-button'));
        });

        await waitFor(() => {
            expect(mockContract.uploadData).toHaveBeenCalledWith('mockIpfsHash123');
            expect(screen.getByTestId('ipfs-hash')).toBeInTheDocument();
        });
    });
});
