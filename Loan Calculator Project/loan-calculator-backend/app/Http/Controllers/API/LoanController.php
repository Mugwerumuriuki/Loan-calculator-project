<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\LoanCalculator;
use DateTime;
use Illuminate\Http\Request;

class LoanController extends Controller
{
    public function computeInterest(Request $request, LoanCalculator
    $calculator)
    {
        $validated = $request->validate([
            'amount_to_borrow' => 'required|integer',
            'payment_frequency' => 'required|string',
            'loan_period' => 'required|integer',
            'start_date' => 'required|date',
            'interest_type' => 'required|string'
        ]);

        $banks = [];

        switch ($validated['interest_type']) {
            case 'Reducing balance':
                $bankAInstallments = $calculator->calculateReducingBalanceInstallments
                ($validated['amount_to_borrow'], 0.25, $validated['loan_period'], $validated['payment_frequency'],$validated['start_date']);

                $bankBInstallments = $calculator->calculateReducingBalanceInstallments(
                    $validated['amount_to_borrow'], 0.22, $validated['loan_period'], $validated['payment_frequency'],$validated['start_date']);

                $bankAInstallments['bank_name'] = 'Bank A';
                $bankBInstallments['bank_name'] = 'Bank B';
                $banks = array(
                    'interest_type' => $validated['interest_type'],
                    'bank_a' => $bankAInstallments,
                    'bank_b' => $bankBInstallments
                );
                break;
            case 'Flat rate':
                $bankAFlatInstallments = $calculator->calculateFlatRateInstallments(
                    $validated['amount_to_borrow'], 0.2, $validated['loan_period'], $validated['payment_frequency'],$validated['start_date']);

                $bankBFlatInstallments = $calculator->calculateFlatRateInstallments(
                    $validated['amount_to_borrow'], 0.18, $validated['loan_period'], $validated['payment_frequency'],$validated['start_date']);

                $bankAFlatInstallments['bank_name'] = 'Bank A';
                $bankBFlatInstallments['bank_name'] = 'Bank B';
                $banks = array(
                    'interest_type' => $validated['interest_type'],
                    'bank_a' => $bankAFlatInstallments,
                    'bank_b' => $bankBFlatInstallments
                );
                break;
        }

        return $banks;
    }

}
