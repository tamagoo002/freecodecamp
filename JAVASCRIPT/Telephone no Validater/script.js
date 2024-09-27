const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const userInput = document.getElementById("user-input");
const resultsDiv = document.getElementById("results-div");

const validPhoneNumber = /^1?\s?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;

checkBtn.addEventListener("click", () => {
  const phoneNumber = userInput.value.trim();
  
  if (!phoneNumber) {
    alert("Please provide a phone number");
    return;
  }

  if (validPhoneNumber.test(phoneNumber)) {
    resultsDiv.innerHTML = `Valid US number: ${phoneNumber}`;
    resultsDiv.style.color = "green";
  } else {
    resultsDiv.innerHTML = `Invalid US number: ${phoneNumber}`;
    resultsDiv.style.color = "red";
  }
});

clearBtn.addEventListener("click", () => {
  userInput.value = "";
  resultsDiv.innerHTML = "";
});
