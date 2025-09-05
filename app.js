// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// 🔹 ضع إعدادات Firebase الخاصة بك هنا
const firebaseConfig = {
  apiKey: "AIzaSyCWE9mJdMoIHD3D10mqHMLS-8JugY5qnLU",
  authDomain: "chatt-live.firebaseapp.com",
  databaseURL: "https://chatt-live-default-rtdb.firebaseio.com",
  projectId: "chatt-live",
  storageBucket: "chatt-live.appspot.com",
  messagingSenderId: "19701994910",
  appId: "1:19701994910:web:30600c924feadff1f1328f"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let userNumber = null;

// بدء الدردشة بعد إدخال الرقم
window.startChat = function() {
  const input = document.getElementById('userInput').value.trim();
  if (!input) {
    alert("ادخل الرقم الخاص بالمستخدم!");
    return;
  }
  userNumber = input;
  document.querySelector('.setup').style.display = 'none';
  listenMessages();
};

// إرسال رسالة
window.sendMessage = function() {
  const text = document.getElementById('messageInput').value.trim();
  if (!text || !userNumber) return;

  push(ref(db, 'sessions/' + userNumber + '/messages'), {
    sender: userNumber,
    text: text,
    timestamp: Date.now()
  });

  document.getElementById('messageInput').value = '';
};

// استقبال الرسائل مباشرة
function listenMessages() {
  const messagesRef = ref(db, 'sessions/' + userNumber + '/messages');
  onChildAdded(messagesRef, (snapshot) => {
    const msg = snapshot.val();
    displayMessage(msg);
  });
}

// عرض الرسائل
function displayMessage(msg) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.textContent = msg.sender + ": " + msg.text;
  document.getElementById('messages').appendChild(div);
  document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}