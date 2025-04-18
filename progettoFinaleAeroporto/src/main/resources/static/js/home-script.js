const toggleLoginBox = () =>{
  const box = document.querySelector(".login-box");
  box.style.display = box.style.display === "none" ? "block" : "none";
  backToLogin();
}

const showRegistration = () =>{
  document.getElementById("login-form").style.display = "none";
  document.getElementById("registration-form").style.display = "block";
}

const showChangePassword = () => {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("reset-form").style.display = "block";
  document.getElementById("")
};
const annullaReset = () => {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("reset-form").style.display = "none";
};
const backToLogin = () => {
  document.getElementById("registration-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
  document.getElementById("new-username").value = "";
  document.getElementById("new-password").value = "";
}
const hideChangePassword = () =>{
    document.getElementById("reset-form").style.display = "none";
}


const sendLogin = (e) => {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const username_err = document.getElementById("username_errato");
    const password_err = document.getElementById("password_errata");

  
    fetch(`http://localhost:8080/utenti/username/${username}`)
      .then((res) => {
        if (!res.ok) {
          username_err.innerText = "Utente non trovato";
          return null;
        } else {
          username_err.innerText = "";
          return res.json();
        }
      })
      .then((utente) => {
        if (!utente) return;
  
        if (utente.password !== password) {
          password_err.innerText = "Password errata";
          return;
        }
  
        password_err.innerText = "";
  
        sessionStorage.setItem("username", utente.username);
        sessionStorage.setItem("password", password);
        sessionStorage.setItem("isAdmin", utente.admin);
        sessionStorage.setItem("codiceFiscale", utente.codiceFiscale);
  
        window.location.href = "admin_user.html";
      })
      .catch((error) => {
        console.error("Errore durante il login:", error);
      });
  };
  
  const submitRegistration = (e) => {
    e.preventDefault();
  
    const nome = document.getElementById("nome").value.trim();
    const cognome = document.getElementById("cognome").value.trim();
    const indirizzo = document.getElementById("new-indirizzo").value.trim();
    const codiceFiscale = document.getElementById("codice-fiscale").value.trim();
    const username = document.getElementById("new-username").value.trim();
    const password = document.getElementById("new-password").value.trim();
    const securityAnswer = document.getElementById("security-answer").value.trim();
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    const password_error = document.getElementById("password_errata_2");
  
    if (!passwordRegex.test(password)) {
      password_error.innerText = "La password deve contenere almeno 8 caratteri, una maiuscola, una minuscola, un numero e un carattere speciale.";
      return;
    } else {
      password_error.innerText = "";
    }
  
    if (codiceFiscale.length !== 16) {
      document.getElementById("codiceFiscale_err").innerText = "Lunghezza errata";
      return;
    } else {
      document.getElementById("codiceFiscale_err").innerText = "";
    }
  
    fetch(`http://localhost:8080/utenti/${codiceFiscale}`)
      .then((res) => {
        if (res.ok) {
          document.getElementById("codiceFiscale_err").innerText = "Codice Fiscale già utilizzato";
          return;
        } else {
          document.getElementById("codiceFiscale_err").innerText = "";
  
          fetch(`http://localhost:8080/utenti/username/${username}`)
            .then((res) => {
              if (res.ok) {
                document.getElementById("username_err").innerText = "Username già utilizzato";
                return;
              } else {
                document.getElementById("username_err").innerText = "";
  
                fetch("http://localhost:8080/utenti", {
                  method: "POST",
                  body: JSON.stringify({
                    nome: nome,
                    cognome: cognome,
                    indirizzo: indirizzo,
                    codiceFiscale: codiceFiscale,
                    username: username,
                    password: password,
                    parolaSegreta: securityAnswer,
                  }),
                  headers: {
                    "Content-type": "application/json;charset=UTF-8",
                  },
                })
                .then(() => {
                  console.log("entro nel then");
                    alert("Registrazione completata con successo!");
                    sessionStorage.setItem("username", username);
                    sessionStorage.setItem("password", password);
                    sessionStorage.setItem("isAdmin", false); // oppure true se vuoi forzare admin
                    sessionStorage.setItem("codiceFiscale", codiceFiscale);
                    window.location.href = "admin_user.html";
                })
                .catch((error) => {
                  console.error("Errore durante la registrazione:", error);
                });
              }
            })
            .catch((error) => {
              console.error("Errore durante il controllo username:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Errore durante il controllo codice fiscale:", error);
      });
  };
  

const resetPassword = (e) => {
  e.preventDefault();
  const username = document.getElementById("reset-username").value.trim();
  const securityAnswer = document
    .getElementById("security-question")
    .value.trim();
  const password1 = document.getElementById("new-password-2").value.trim();
  const password2 = document.getElementById("confirm-password").value.trim();
  const password_error=document.getElementById("password_err_3");
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  if (!passwordRegex.test(password1)) {
      password_error.innerText = "La password deve contenere almeno 8 caratteri, una maiuscola, una minuscola, un numero e un carattere speciale.";
      console.log("allora");
      return;
    } else {
      password_error.innerText = "";
    }
  if (password1 !== password2) {
    alert("Le password non coincidono.");
    return;
  }

  fetch(`http://localhost:8080/utenti/username/${username}`)
    .then((res) => {
      if (!res.ok) {
        document.getElementById("username_err_rest").innerText =
          "Username non trovato";
        return null;
      } else {
        document.getElementById("username_err_rest").innerText = "";
        return res.json();
      }
    })
    .then((utente) => {
      if (!utente) return;

      fetch(
        `http://localhost:8080/utenti/${utente.codiceFiscale}/${securityAnswer}/${password1}`,
        {
          method: "PUT",
        }
      )
        .then((res) => {
          if (res.ok) {
            alert("Password aggiornata con successo!");
            hideChangePassword();
            backToLogin();
          } else {
            document.getElementById("secret_err_rest").innerText =
              "Parola segreta errata.";
          }
        })
        .catch((error) => {
          console.error("Errore durante il reset della password:", error);
        });
    })
    .catch((error) => {
      console.error("Errore nel recupero utente:", error);
    });
};
