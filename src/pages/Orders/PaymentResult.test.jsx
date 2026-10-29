import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PaymentResult from './PaymentResult';
import { callBakeryPayment } from '../../utils/bakeryPayments';
import { useCart } from '../../context/CartContext';
jest.mock('../../utils/bakeryPayments', () => ({ callBakeryPayment: jest.fn() }));
jest.mock('../../context/CartContext', () => ({ useCart: jest.fn() }));
let mockQuery = '';
jest.mock('react-router-dom', () => ({
    useSearchParams: () => [new URLSearchParams(mockQuery)],
    Link: ({ to, children }) => <a href={to}>{children}</a>,
}), { virtual: true });
const clearCart = jest.fn();
beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
    useCart.mockReturnValue({ clearCart });
});
const open = (query) => { mockQuery = query; return render(<PaymentResult />); };
test('only clears cart after server confirms payment', async () => {
    sessionStorage.setItem('souraw-payment-cart', '[{}]');
    callBakeryPayment.mockResolvedValue({ paid: true });
    open('session_id=cs_test_reference');
    await screen.findByText('Payment received ♡');
    expect(callBakeryPayment).toHaveBeenCalledWith('getBakeryPayment', { sessionId: 'cs_test_reference' });
    expect(clearCart).toHaveBeenCalledTimes(1);
    expect(sessionStorage.getItem('souraw-payment-cart')).toBeNull();
});
test('retains cart and avoids claiming success when verification fails', async () => {
    callBakeryPayment.mockRejectedValue(new Error('offline'));
    open('session_id=cs_test_reference');
    await screen.findByText('Unable to verify payment');
    expect(clearCart).not.toHaveBeenCalled();
});
test('canceling never verifies or clears the cart', async () => {
    open('canceled=1');
    await waitFor(() => expect(screen.getByText('Payment canceled')).toBeTruthy());
    expect(clearCart).not.toHaveBeenCalled();
    expect(callBakeryPayment).not.toHaveBeenCalled();
});
