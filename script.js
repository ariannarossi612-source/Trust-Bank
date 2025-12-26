const firebaseConfig = {
  apiKey: "xxxx",
  authDomain: "trust-bank-11868.firebaseapp.com",
  projectId: "trust-bank-11868",
  storageBucket: "trust-bank-11868.appspot.com",
  messagingSenderId: "xxxx",
  appId: "xxxx"
};
firebase.initializeApp(firebaseConfig);

document.getElementById('login-btn').addEventListener('click', function() {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  // For now, just show balance section
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('balance-section').style.display = 'block';
});
document.getElementById('logout-btn').addEventListener('click', function() {
  document.getElementById('login-section').style.display = 'block';
  document.getElementById('balance-section').style.display = 'none';
});