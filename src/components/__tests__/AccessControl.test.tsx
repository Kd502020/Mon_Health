import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react';  // Changed from 'react-dom/test-utils'
import '@testing-library/jest-dom';
import AccessControl from '../AccessControl';

describe('AccessControl', () => {
    const mockContract = {
        grantAccess: jest.fn().mockResolvedValue(undefined),
        revokeAccess: jest.fn().mockResolvedValue(undefined)
    };
    const account = "0x1234567890123456789012345678901234567890";

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders input field and grant button', async () => {
        await act(async () => {
            render(<AccessControl contract={mockContract} account={account} />);
        });

        expect(screen.getByPlaceholderText('Address to grant access')).toBeTruthy();
        expect(screen.getByText('Grant Access')).toBeTruthy();
    });

    it('calls grantAccess when address is submitted', async () => {
        await act(async () => {
            render(<AccessControl contract={mockContract} account={account} />);
        });

        const validAddress = "0x1234567890123456789012345678901234567890";
        const input = screen.getByPlaceholderText('Address to grant access');

        await act(async () => {
            fireEvent.change(input, { target: { value: validAddress } });
            fireEvent.click(screen.getByText('Grant Access'));
        });

        expect(mockContract.grantAccess).toHaveBeenCalledWith(account, validAddress);
    });
});
