let price = 19.5; // Price of the item
let cid = [ // Cash in drawer
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
];

const calculateChange = (changeDue, cid) => {
    let totalCid = cid.reduce((total, curr) => total + curr[1], 0).toFixed(2);
    let changeArray = [];

    const currencyUnits = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.1,
        "QUARTER": 0.25,
        "ONE": 1,
        "FIVE": 5,
        "TEN": 10,
        "TWENTY": 20,
        "ONE HUNDRED": 100
    };

    if (totalCid == changeDue) {
        let sortedCid = cid.filter(c => c[1] > 0).sort((a, b) => currencyUnits[b[0]] - currencyUnits[a[0]]);
        return { status: "CLOSED", change: sortedCid };
    }

    if (totalCid < changeDue) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    let remainingChange = changeDue;

    for (let i = cid.length - 1; i >= 0; i--) {
        const coinName = cid[i][0];
        let coinTotal = cid[i][1];
        let coinValue = currencyUnits[coinName];
        let amountFromDenom = 0;

        while (remainingChange >= coinValue && coinTotal > 0) {
            remainingChange -= coinValue;
            coinTotal -= coinValue;
            amountFromDenom += coinValue;
            remainingChange = remainingChange.toFixed(2);
        }

        if (amountFromDenom > 0) {
            changeArray.push([coinName, amountFromDenom]);
        }
    }

    if (remainingChange > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    return { status: "OPEN", change: changeArray };
};

const handlePurchase = () => {
    const cash = parseFloat(document.getElementById("cash").value); // Get the cash input from the user
    const changeDueElem = document.getElementById("change-due"); // Get the element to display the change due

    // Calculate the change due
    const changeDue = cash - price;

    // Calculate the change using the calculateChange function
    const result = calculateChange(changeDue, cid);

    // Display the results in the 'change-due' element
    if (result.status === "OPEN") {
        changeDueElem.innerHTML = `Change to be returned: ${result.change.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(', ')}`;
    } else if (result.status === "CLOSED") {
        changeDueElem.innerHTML = "The drawer is closed. Change cannot be returned.";
    } else {
        changeDueElem.innerHTML = "Insufficient funds.";
    }
};

// Add event listener to the button
document.getElementById("purchase-btn").addEventListener("click", handlePurchase);
