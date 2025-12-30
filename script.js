/* ================= MOBILE MENU ================= */
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuButton) {
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });
}

/* ================= SCROLL ANIMATION ================= */
function checkScrollAnimations() {
  document.querySelectorAll(".scroll-animation").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 150) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("load", checkScrollAnimations);
window.addEventListener("scroll", checkScrollAnimations);

/* ================= LOGIN STATE ================= */
let isLoggedIn = localStorage.getItem("loggedIn") === "true";

/* ================= LOGIN MODAL ================= */
function openLogin() {
  document.getElementById("loginModal").classList.remove("hidden");
}

function closeLogin() {
  document.getElementById("loginModal").classList.add("hidden");
}

/* ================= LOGIN FUNCTION ================= */
function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Login Successful ✅");
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userEmail", email);
        isLoggedIn = true;
        closeLogin();
      } else {
        alert("Invalid Login ❌");
      }
    })
    .catch(() => alert("Backend not reachable"));
}

/* ================= LOGOUT ================= */
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}


/* ================= BOOKING MODAL ================= */
function openModal() {
  if (!isLoggedIn) {
    alert("Please login to book");
    openLogin();
    return;
  }
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

/* ================= BOOKING SUBMIT ================= */
function submitBooking(e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("bname").value,
    email: document.getElementById("bemail").value,
    destination: document.getElementById("bdestination").value,
    people: document.getElementById("bpeople").value
  };

  fetch("http://localhost:5000/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(() => {
      alert("Booked Successfully ✅");
      closeModal();
    })
    .catch(() => alert("Booking failed"));
}
/* ================= UI UPDATE ================= */
window.addEventListener("load", () => {
  const loggedIn = localStorage.getItem("loggedIn");
  const email = localStorage.getItem("userEmail");

  const loginBtn = document.querySelector(".login-btn");
  const userBtn = document.getElementById("userBtn");

  if (loggedIn && email) {
    loginBtn.style.display = "none";

    userBtn.innerText = email.charAt(0).toUpperCase();
    userBtn.classList.remove("hidden");
  } else {
    loginBtn.style.display = "block";
    userBtn.classList.add("hidden");
  }
});

function toggleUserMenu() {
  document.getElementById("userMenu").classList.toggle("hidden");
}
function logout() {
  localStorage.clear();
  alert("Logged out");
  window.location.href = "index.html";
}
function goGallery() {
  window.location.href = "gallery.html";
}
