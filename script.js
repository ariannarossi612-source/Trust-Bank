// 1️⃣ Firebase Config (already added)
const firebaseConfig = {
  apiKey: "xxxx",
  authDomain: "trust-bank-11868.firebaseapp.com",
  projectId: "trust-bank-11868",
  storageBucket: "trust-bank-11868.appspot.com",
  messagingSenderId: "xxxx",
  appId: "xxxx"
};
firebase.initializeApp(firebaseConfig);

// 2️⃣ Firebase Services
const auth = firebase.auth();
const db = firebase.firestore();

// 3️⃣ Login button
document.getElementById('login-btn').addEventListener('click', async function() {
  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    // Login or create user
    let userCredential = await auth.signInWithEmailAndPassword(email, password);

    // Hide login, show balance
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('balance-section').style.display = 'block';

    // Load balance from Firestore
    const docRef = db.collection('bank').doc('main');
    const doc = await docRef.get();
    if (doc.exists) {
      document.getElementById('balance').innerText = doc.data().amount.toFixed(2);
    }

    // Show admin features if admin
    if (userCredential.user.email === "admin@trustbank.app") {
      const addButton = document.createElement('button');
      addButton.innerText = "Add $1000";
      addButton.addEventListener('click', async () => {
        await docRef.update({
          amount: firebase.firestore.FieldValue.increment(1000)
        });
        const updatedDoc = await docRef.get();
        document.getElementById('balance').innerText = updatedDoc.data().amount.toFixed(2);
      });
      document.getElementById('balance-section').appendChild(addButton);
    }

  } catch (error) {
    alert("Login failed: " + error.message);
  }
});

// 4️⃣ Logout button
document.getElementById('logout-btn').addEventListener('click', function() {
  auth.signOut();
  document.getElementById('login-section').style.display = 'block';
  document.getElementById('balance-section').style.display = 'none';
});