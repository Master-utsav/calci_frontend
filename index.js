const API_URL = 'https://calci-backend.onrender.com';

async function clearDisplay() {
    try {
        const response = await fetch(`${API_URL}/delete`, {
            method: 'GET',
        });
        const data = await response.json();
        document.getElementById('display').value = data.result;
    } catch (error) {
        console.error('Error clearing display:', error);
    }
}

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

async function calculate() {
    const display = document.getElementById('display').value;
    const val = display.toString()

    try {
        const response = await fetch(`${API_URL}/calculate?expression=${val}`, {
            method: 'GET',
        });
        const data = await response.json();
        if (data.result !== undefined) {
            document.getElementById('display').value = data.result;
        } else if (data.error) {
            document.getElementById('display').value = 'Error';
        }
    } catch (error) {
        console.error('Error calculating expression:', error);
        document.getElementById('display').value = 'Error';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const buttonText = event.target.textContent;
            
            if (buttonText === 'C') {
                clearDisplay();
            } else if (buttonText === '=') {
                calculate();
            } else {
                appendToDisplay(buttonText);
            }
        });
    });
});
