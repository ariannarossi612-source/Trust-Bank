const DAILY_LIMIT = 50600;
let balance = 50600;

// Users
const ADMIN_EMAIL = "admin@trustbank.app";
const CLIENT_EMAIL = "Henry@trustbank.app";

// LOGIN
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      if (email === ADMIN_EMAIL) {
        window.location = "admin.html";
      } else if (email === CLIENT_EMAIL) {
        window.location = "dashboard.html";
      } else {
        alert("Unauthorized user");
        firebase.auth().signOut();
      }
    })
    .catch(err => alert(err.message));
}

// CLIENT TRANSFER REQUEST
function requestTransfer() {
  const amount = Number(document.getElementById("amount").value);
  const status = document.getElementById("status");

  if (amount <= 0) {
    status.innerText = "Invalid amount";
    return;
  }

  if (amount > DAILY_LIMIT) {
    status.innerText = "Daily limit $50,600 exceeded";
    return;
  }

  status.innerText = "Available for transfer (Pending admin approval)";
  addRequestToAdmin(amount);
}

// SEND REQUEST TO ADMIN LIST
function addRequestToAdmin(amount) {
  const requestsList = document.getElementById("requests");
  if (!requestsList) return; // Only admin page has this

  const li = document.createElement("li");
  li.innerText = `$${amount.toFixed(2)} - Pending`;
  const approveBtn = document.createElement("button");
  approveBtn.innerText = "Approve";
  approveBtn.onclick = () => {
    balance -= amount;
    document.getElementById("balance").innerText = balance.toFixed(2);
    li.innerText = `$${amount.toFixed(2)} - Approved`;
  };
  li.appendChild(approveBtn);
  requestsList.appendChild(li);
}

// LOGOUT
function logout() {
  firebase.auth().signOut().then(() => {
    window.location = "index.html";
  });
}

// EXPORT FOR HTML BUTTONS
window.login = login;
window.logout = logout;
window.requestTransfer = requestTransfer;
window.approveTransfer = addRequestToAdmin;