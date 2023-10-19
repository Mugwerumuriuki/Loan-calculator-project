<?php

namespace App\Services;

use http\Env\Response;

class LoanCalculator
{
    public function calculateReducingBalanceInstallments(
       $principal,$rate,$loanPeriod, $paymentFrequency, $startDate
    ): array {
        $effectiveRate = 0;
        $effectiveTime = 0;

        $currentDate = strtotime($startDate);

        switch ($paymentFrequency) {
            case 'annually':
                $effectiveRate = $rate;
                $effectiveTime = $loanPeriod;
                $multiplier = 1;
                break;
            case 'quarterly':
                $effectiveRate = $rate / 4;
                $effectiveTime = $loanPeriod * 4;
                $multiplier = 4;
                break;
            case 'monthly':
                $effectiveRate = $rate / 12;
                $effectiveTime = $loanPeriod * 12;
                $multiplier = 12;
                break;
            case 'every 6 months':
                $effectiveRate = $rate / 2;
                $effectiveTime = $loanPeriod * 2;
                $multiplier = 2;
                break;
            default:
                $effectiveRate = $rate;
                $effectiveTime = $loanPeriod;
                $multiplier = 1;
        }

        $installments = [];
        $remainingPrincipal = $principal;
        $totalInterest = 0;
        for ($i = 0; $i < $effectiveTime; $i++) {
            $interest = $remainingPrincipal * $effectiveRate;
            $installment = $interest + $remainingPrincipal / $effectiveTime;
            $installments[] = [
                'installment' => $i +1,
                'interest' => $installment,
                'date' => date('Y-m-d', $currentDate),
            ];
            $totalInterest += $installment;
            $remainingPrincipal -= $remainingPrincipal / $effectiveTime;

            $currentDate = strtotime('+' . (12 / $multiplier) . ' months', $currentDate);
        }

        $processingFee = 0.03 * $principal;
        $exciseDuty = 0.2 * $processingFee;
        $legalFee = 10000;

        $totalCharges = $processingFee + $exciseDuty + $legalFee;

        $takeHome = $principal - $totalCharges;

        $result = array(
            'total_interest'  => $totalInterest,
            'installments' => $installments,
            'processing_fee' => $processingFee,
            'excise_duty' => $exciseDuty,
            'legal_fee' => $legalFee,
            'take_home' => $takeHome
        );

        return $result;
    }

    public function calculateFlatRateInstallments(
        $principal, $rate, $loanPeriod, $paymentFrequency, $startDate
    ): array {
        $installments = [];
        $totalInterest = 0;
        $currentDate = strtotime($startDate);

        switch ($paymentFrequency) {
            case 'annually':
                $multiplier = 1;
                break;
            case 'quarterly':
                $multiplier = 4;
                break;
            case 'monthly':
                $multiplier = 12;
                break;
            case 'every 6 months':
                $multiplier = 2;
                break;
            default:
                $multiplier = 1;
        }

        for ($i = 0; $i < $loanPeriod * $multiplier; $i++) {
            $interest = $principal * $rate * 1;
            $totalInterest += $interest;
            $installments[] = array(
                'installment' => $i + 1,
                'interest' => $interest,
                'date' => date('Y-m-d', $currentDate),
            );

            $currentDate = strtotime('+' . (12 / $multiplier) . ' months', $currentDate);
        }

        $processingFee = 0.03 * $principal;
        $exciseDuty = 0.2 * $processingFee;
        $legalFee = 10000;

        $totalCharges = $processingFee + $exciseDuty + $legalFee;

        $takeHome = $principal - $totalCharges;

        $result = array(
            'total_interest'  => $totalInterest,
            'installments' => $installments,
            'processing_fee' => $processingFee,
            'excise_duty' => $exciseDuty,
            'legal_fee' => $legalFee,
            'take_home' => $takeHome
        );

        return $result;
    }
}