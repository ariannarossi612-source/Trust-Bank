// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCwjKTzj_1azYihm7jYxFYuIoM5OOFwZ58",
  authDomain: "trust-bank-11868.firebaseapp.com",
  projectId: "trust-bank-11868",
  storageBucket: "trust-bank-11868.firebasestorage.app",
  messagingSenderId: "351989319032",
  appId: "1:351989319032:web:7c7c413a80895cb8ef748d",
  measurementId: "G-RE3JFD6WQJ"
};
firebase.initializeApp(firebaseConfig);

// Firebase Services
const auth = firebase.auth();
const db = firebase.firestore();

// Elements
const loginSection = document.getElementById('login-section');
const dashboard = document.getElementById('dashboard');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const balanceEl = document.getElementById('balance');
const userNameEl = document.getElementById('user-name');
const addFundsBtn = document.getElementById('add-funds-btn');
const cardNameEl = document.getElementById('card-name');
const cardBalanceEl = document.getElementById('card-balance');
const transferBtn = document.getElementById('transfer-btn');

// Predefined Admin
const ADMIN_EMAIL = "admin@trustbank.app";
const ADMIN_PASSWORD = "TBadmin123";

// Login Function
loginBtn.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  auth.signInWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      loginSection.style.display = 'none';
      dashboard.style.display = 'block';

      const user = userCredential.user;
      userNameEl.innerText = email.split("@")[0];
      cardNameEl.innerText = email.split("@")[0];

      // Firestore: get or create balance document
      const docRef = db.collection('users').doc(user.uid);
      const doc = await docRef.get();
      if (!doc.exists) {
        await docRef.set({ balance: 0 });
      }
      const snapshot = await docRef.get();
      const balance = snapshot.data().balance;
      balanceEl.innerText = balance.toFixed(2);
      cardBalanceEl.innerText = balance.toFixed(2);

      // Show add funds only for admin
      if(email === ADMIN_EMAIL) {
        addFundsBtn.style.display = 'inline-block';
        addFundsBtn.addEventListener('click', async () => {
          await docRef.update({
            balance: firebase.firestore.FieldValue.increment(1000)
          });
          const updated = await docRef.get();
          balanceEl.innerText = updated.data().balance.toFixed(2);
          cardBalanceEl.innerText = updated.data().balance.toFixed(2);
        });
      }
    })
    .catch((err) => alert(err.message));
});

// Logout Function
logoutBtn.addEventListener('click', () => {
  auth.signOut().then(() => {
    dashboard.style.display = 'none';
    loginSection.style.display = 'block';
    emailInput.value = "";
    passwordInput.value = "";
  });
});

// Transfer Button
transferBtn.addEventListener('click', () => {
  alert("Unable to transfer");
});