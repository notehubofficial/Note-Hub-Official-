<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBIcVOiFWPLY2wdznF1zMP77GE11cRYEgc",
    authDomain: "note-hub-official.firebaseapp.com",
    projectId: "note-hub-official",
    storageBucket: "note-hub-official.firebasestorage.app",
    messagingSenderId: "929255071480",
    appId: "1:929255071480:web:e0b9f0c38ce708d743650d",
    measurementId: "G-LGPN0HX5RX"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Google Login Function
  window.loginWithGoogle = function() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        alert("خوش آمدید " + result.user.displayName);
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        alert("لاگ ان میں مسئلہ: " + error.message);
      });
  };

  // Logout Function
  window.logout = function() {
    signOut(auth).then(() => {
      window.location.href = "index.html";
    });
  };
</script>
