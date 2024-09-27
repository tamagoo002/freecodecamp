document.getElementById('check-btn').addEventListener('click', function() {
    const input = document.getElementById('text-input').value;

    if (!input) {
        alert("Please input a value");
        return;
    }

    const originalInput = input;
    const cleanedInput = input.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedInput = cleanedInput.split('').reverse().join('');

    const resultElement = document.getElementById('result');

    if (cleanedInput === reversedInput) {
        resultElement.textContent = `${originalInput} is a palindrome`;
    } else {
        resultElement.textContent = `${originalInput} is not a palindrome`;
    }
});
