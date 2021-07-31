import { PayloadAction } from '@reduxjs/toolkit';
import transactions, { initialState, addTransaction } from './user';
import { mockTransactions } from '../../services/mockTransactions';

describe('transactions reducer', () => {
    test('should return the initial state if no known action is provided', () => {
        expect(transactions(undefined, {} as PayloadAction)).toEqual(
            initialState
        );
    });
    // test('should add new transaction', () => {
    //     expect(transactions([], addTransaction(mockTransactions[0]))).toEqual([
    //         mockTransactions[0],
    //     ]);
    // });
    // test('should add another transaction in non empty array of transactions', () => {
    //     expect(
    //         transactions(
    //             [mockTransactions[0]],
    //             addTransaction(mockTransactions[1])
    //         )
    //     ).toEqual([mockTransactions[0], mockTransactions[1]]);
    // });
});
