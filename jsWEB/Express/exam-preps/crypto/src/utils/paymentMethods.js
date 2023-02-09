
module.exports = function (paymentMethodSelected) {
    const paymentMethods = [
        { value: 'crypto-wallet', label: 'Crypto Wallet', selected: false },
        { value: 'credit-card', label: 'Credit Card', selected: false },
        { value: 'debit-card', label: 'Debit Card', selected: false },
        { value: 'paypal', label: 'PayPal', selected: false }
    ]
    const selectedMethod = paymentMethods.find(met => met.value === paymentMethodSelected);
    if (selectedMethod) selectedMethod.selected = true;

    return paymentMethods;
}

