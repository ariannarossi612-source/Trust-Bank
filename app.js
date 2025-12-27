import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const DAILY_LIMIT = 50600;
let balance = 0;
let dailyUsed = 0;

// LOGIN
window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
};

// CHECK LOGIN
onAuthStateChanged(auth, user => {
  if (user && document.getElementById("welcome")) {
    document.getElementById("welcome").innerText =
      "Hello, " + user.email;
    document.getElementById("balance").innerText = balance.toFixed(2);
  }
});

// TRANSFER
window.transfer = function () {
  const amount = Number(document.getElementById("amount").value);
  const message = document.getElementById("message");

  if (amount <= 0) {
    message.innerText = "Invalid amount";
    return;
  }

  if (dailyUsed + amount > DAILY_LIMIT) {
    message.innerText = "Daily limit ₦50,600 exceeded";
    return;
  }

  dailyUsed += amount;
  balance -= amount;

  document.getElementById("balance").innerText = balance.toFixed(2);
  message.innerText = "Transfer successful";
};

// LOGOUT
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};