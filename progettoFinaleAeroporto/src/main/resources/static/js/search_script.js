let tuttiIVoli = [];
let dataOggi = "";
let codiceFiscale = sessionStorage.getItem("codiceFiscale");
let username = sessionStorage.getItem("username");
let password = sessionStorage.getItem("password");
let isAdmin = sessionStorage.getItem("isAdmin");

document.addEventListener("DOMContentLoaded", () => {
  if (isAdmin==="true") {
    document.getElementById("roba-per-admin").style.display = "block";
  }
  document.getElementById("logout").innerHTML+=" / "+username;
  
  const oggi = new Date();
  const anno = oggi.getFullYear();
  const mese = String(oggi.getMonth() + 1).padStart(2, "0");
  const giorno = String(oggi.getDate()).padStart(2, "0");
  dataOggi = `${anno}-${mese}-${giorno}`;
  const tendinaPartenza = document.getElementById("tendina-partenza");
  const tendinaArrivo = document.getElementById("tendina-arrivo");
  const tendinaCompagnia = document.getElementById("tendina-compagnia-search");
  fetch("http://localhost:8080/voli")
    .then((res) => res.json())
    .then((voli) => {
      tuttiIVoli = voli;

      const partenze = [];
      const arrivi = [];
      const compagnie = [];

      voli.forEach((volo) => {
        partenze.push(volo.aeroportoPartenza);
        arrivi.push(volo.aeroportoDestinazione);
        compagnie.push(volo.compagnia);
      });

      const partenzeUniche = Array.from(
        new Map(partenze.map((a) => [a.nome, a])).values()
      );
      const arriviUnici = Array.from(
        new Map(arrivi.map((a) => [a.nome, a])).values()
      );
      const compagnieUniche = Array.from(
        new Map(compagnie.map((c) => [c.nome, c])).values()
      );

      partenzeUniche.sort((a, b) => a.citta.localeCompare(b.citta));
      arriviUnici.sort((a, b) => a.citta.localeCompare(b.citta));
      compagnieUniche.sort((a, b) => a.nome.localeCompare(b.nome));

      tendinaPartenza.innerHTML = "";
      partenzeUniche.forEach((a) => {
        tendinaPartenza.innerHTML += `<option value="${a.nome}" data-aeroporto-id="${a.id}">${a.nome} -  ${a.citta}</option>`;
      });

      tendinaArrivo.innerHTML = "";
      arriviUnici.forEach((a) => {
        tendinaArrivo.innerHTML += `<option value="${a.nome}" data-aeroporto-id="${a.id}">${a.nome} -  ${a.citta}</option>`;
      });

      tendinaCompagnia.innerHTML = "";
      compagnieUniche.forEach((c) => {
        tendinaCompagnia.innerHTML += `<option value="${c.nome}" data-compagnia-id="${c.id}">${c.nome}</option>`;
      });
    })
    .catch((error) => console.error("Errore nel caricamento dei voli:", error));
  if (isAdmin) {
    fetch("http://localhost:8080/aeroporti")
      .then((res) => res.json())
      .then((aeroporti) => {
        const partenzeUniche = Array.from(
          new Map(aeroporti.map((a) => [a.nome, a])).values()
        );
        const arriviUnici = [...partenzeUniche];

        partenzeUniche.sort((a, b) => a.citta.localeCompare(b.citta));
        arriviUnici.sort((a, b) => a.citta.localeCompare(b.citta));

        const tendinaPartenzaCrea = document.getElementById(
          "tendina-partenza-crea"
        );
        const tendinaPartenzaModifica = document.getElementById(
          "tendina-partenza-modifica"
        );
        tendinaPartenzaCrea.innerHTML = "";
        tendinaPartenzaModifica.innerHTML = "";
        partenzeUniche.forEach((a) => {
          tendinaPartenzaCrea.innerHTML += `<option value="${a.nome}" data-aeroporto-id="${a.id}">${a.nome} -  ${a.citta}</option>`;
          tendinaPartenzaModifica.innerHTML += `<option value="${a.nome}" data-aeroporto-id="${a.id}">${a.nome} -  ${a.citta}</option>`;
        });

        const tendinaDestinazioneCrea = document.getElementById(
          "tendina-destinazione-crea"
        );
        const tendinaDestinazioneModifica = document.getElementById(
          "tendina-destinazione-modifica"
        );
        tendinaDestinazioneCrea.innerHTML = "";
        tendinaDestinazioneModifica.innerHTML = "";
        arriviUnici.forEach((a) => {
          tendinaDestinazioneCrea.innerHTML += `<option value="${a.nome}" data-aeroporto-id="${a.id}">${a.nome} -  ${a.citta}</option>`;
          tendinaDestinazioneModifica.innerHTML += `<option value="${a.nome}" data-aeroporto-id="${a.id}">${a.nome} -  ${a.citta}</option>`;
        });
      })
      .catch((error) =>
        console.error("Errore nel caricamento degli aeroporti:", error)
      );
    fetch("http://localhost:8080/compagnie")
      .then((res) => res.json())
      .then((compagnie) => {
        const compagnieUniche = Array.from(
          new Map(compagnie.map((c) => [c.nome, c])).values()
        );

        compagnieUniche.sort((a, b) => a.nome.localeCompare(b.nome));
        const tendinaCompagniaCrea = document.getElementById(
          "tendina-compagnia-crea"
        );
        const tendinaCompagniaModifica = document.getElementById(
          "tendina-compagnia-modifica"
        );
        tendinaCompagniaCrea.innerHTML = "";
        tendinaCompagniaModifica.innerHTML = "";
        compagnieUniche.forEach((c) => {
          tendinaCompagniaCrea.innerHTML += `<option value="${c.nome}" data-compagnia-id="${c.id}">${c.nome}</option>`;
          tendinaCompagniaModifica.innerHTML += `<option value="${c.nome}" data-compagnia-id="${c.id}">${c.nome}</option>`;
        });
      })
      .catch((error) =>
        console.error("Errore nel caricamento delle compagnie:", error)
      );
  }
});

const ricercaPartenzaDestinazione = (e) => {
  e.preventDefault();

  const tendinaPartenza = document.getElementById("tendina-partenza");
  const tendinaArrivo = document.getElementById("tendina-arrivo");
  const aeroportoPartenzaId =
    tendinaPartenza.options[tendinaPartenza.selectedIndex].getAttribute(
      "data-aeroporto-id"
    );
  const aeroportoArrivoId =
    tendinaArrivo.options[tendinaArrivo.selectedIndex].getAttribute(
      "data-aeroporto-id"
    );

  const voliFiltrati = tuttiIVoli.filter(
    (volo) =>
      volo.aeroportoPartenza.id == aeroportoPartenzaId &&
      volo.aeroportoDestinazione.id == aeroportoArrivoId &&
      volo.postiDisponibili > 0
  );

  const risultatiContainer = document.getElementById("risultati-voli");
  risultatiContainer.innerHTML = "";
  if (voliFiltrati.length === 0) {
    alert("nessun volo trovato");
    return;
  }

  const tabella = document.createElement("table");
  tabella.innerHTML = `
        <thead>
            <tr>
                <th>Seleziona</th>
                <th>Compagnia</th>
                <th>Partenza</th>
                <th>Destinazione</th>
                <th>Data</th>
                <th>Orario Decollo</th>
                <th>Orario Atterraggio</th>
                <th>Posti Disponibili</th>
            </tr>
        </thead>
        <tbody>
            ${voliFiltrati
      .map(
        (volo) => `
                <tr>
                    <td>
                        <input type="radio" name="selezione-volo" value="${volo.codice
          }" />
                    </td>
                    <td>${volo.compagnia.nome}</td>
                    <td>${volo.aeroportoPartenza.nome} (${volo.aeroportoPartenza.citta
          })</td>
                    <td>${volo.aeroportoDestinazione.nome} (${volo.aeroportoDestinazione.citta
          })</td>
                    <td>${formattaData(volo.data)}</td>
                    <td>${formattaOrario(volo.orarioDecollo)}</td>
                    <td>${formattaOrario(volo.orarioAtterraggio)}</td>
                    <td>${volo.postiDisponibili}</td>
                </tr>
            `
      )
      .join("")}
        </tbody>
    `;
  risultatiContainer.appendChild(tabella);
  risultatiContainer.innerHTML+=`<button id="bottone-prenota"onclick="prenota(event)">Prenota</button>`
  risultatiContainer.style.display = "block";
};

const ricercaPerCompagnia = (e) => {
  e.preventDefault();

  const tendinaCompagnia = document.getElementById("tendina-compagnia-search");

  const compagniaId =
    tendinaCompagnia.options[tendinaCompagnia.selectedIndex].getAttribute(
      "data-compagnia-id"
    );

  const risultatiContainer = document.getElementById("risultati-voli");
  risultatiContainer.innerHTML = "";

  if (!compagniaId) {
    risultatiContainer.innerHTML = "<span>Seleziona una compagnia.</span>";
    return;
  }

  const voliFiltrati = tuttiIVoli.filter(
    (volo) => volo.compagnia.id == compagniaId && volo.postiDisponibili > 0
  );

  if (voliFiltrati.length === 0) {
    risultatiContainer.innerHTML =
      "<span>Nessun volo trovato per la compagnia selezionata.</span>";
    return;
  }

  const tabella = document.createElement("table");
  tabella.innerHTML = `
        <thead>
            <tr>
                <th>Seleziona</th>
                <th>Compagnia</th>
                <th>Partenza</th>
                <th>Destinazione</th>
                <th>Data</th>
                <th>Orario Decollo</th>
                <th>Orario Atterraggio</th>
                <th>Posti Disponibili</th>
            </tr>
        </thead>
        <tbody>
            ${voliFiltrati
      .map(
        (volo) => `
                <tr>
                    <td>
                        <input type="radio" name="selezione-volo" value="${volo.codice
          }" />
                    </td>
                    <td>${volo.compagnia.nome}</td>
                    <td>${volo.aeroportoPartenza.nome} (${volo.aeroportoPartenza.citta
          })</td>
                    <td>${volo.aeroportoDestinazione.nome} (${volo.aeroportoDestinazione.citta
          })</td>
                    <td>${formattaData(volo.data)}</td>
                    <td>${formattaOrario(volo.orarioDecollo)}</td>
                    <td>${formattaOrario(volo.orarioAtterraggio)}</td>
                    <td>${volo.postiDisponibili}</td>
                </tr>
            `
      )
      .join("")}
        </tbody>
    `;
  risultatiContainer.appendChild(tabella);
    risultatiContainer.innerHTML+=`<button id="bottone-prenota"onclick="prenota(event)">Prenota</button>`
  risultatiContainer.style.display = "block";
};

const ricercaPerDataPartenza = (e) => {
  e.preventDefault();

  const inputDataPartenza = document.getElementById("data-partenza");
  const dataSelezionata = inputDataPartenza.value; // formato yyyy-mm-dd

  const risultatiContainer = document.getElementById("risultati-voli");
  risultatiContainer.innerHTML = "";

  if (!dataSelezionata) {
    alert("Seleziona una data di partenza.");
    return;
  }

  if (dataSelezionata < dataOggi) {
    alert("La data selezionata non può essere nel passato.");
    return;
  }

  const voliFiltrati = tuttiIVoli.filter(
    (volo) => volo.data === dataSelezionata && volo.postiDisponibili > 0
  );

  if (voliFiltrati.length === 0) {
    alert("Nessun volo trovato per la data selezionata.");
    return;
  }

  const tabella = document.createElement("table");
  tabella.innerHTML = `
        <thead>
            <tr>
                <th>Seleziona</th>
                <th>Compagnia</th>
                <th>Partenza</th>
                <th>Destinazione</th>
                <th>Data</th>
                <th>Orario Decollo</th>
                <th>Orario Atterraggio</th>
                <th>Posti Disponibili</th>
            </tr>
        </thead>
        <tbody>
            ${voliFiltrati
      .map(
        (volo) => `
                <tr>
                    <td>
                        <input type="radio" name="selezione-volo" value="${volo.codice
          }" />
                    </td>
                    <td>${volo.compagnia.nome}</td>
                    <td>${volo.aeroportoPartenza.nome} (${volo.aeroportoPartenza.citta
          })</td>
                    <td>${volo.aeroportoDestinazione.nome} (${volo.aeroportoDestinazione.citta
          })</td>
                    <td>${formattaData(volo.data)}</td>
                    <td>${formattaOrario(volo.orarioDecollo)}</td>
                    <td>${formattaOrario(volo.orarioAtterraggio)}</td>
                    <td>${volo.postiDisponibili}</td>
                </tr>
            `
      )
      .join("")}
        </tbody>
    `;
  risultatiContainer.appendChild(tabella);
  risultatiContainer.innerHTML+=`<button id="bottone-prenota"onclick="prenota(event)">Prenota</button>`
  risultatiContainer.style.display = "block";
};

const prenota = (e) => {
  e.preventDefault();

  const radioSelezionato = document.querySelector(
    'input[name="selezione-volo"]:checked'
  );

  if (!radioSelezionato) {
    alert("Per favore, seleziona un volo da prenotare.");
    return;
  }

  const idVolo = radioSelezionato.value;

  const datiPrenotazione = {
    utenteId: codiceFiscale,
    voloId: idVolo,
  };

  fetch("http://localhost:8080/prenotazioni", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datiPrenotazione),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella risposta del server");
      }
      return response.json();
    })
    .then((data) => {
      alert("Prenotazione effettuata con successo!");
      location.reload();
    })
    .catch((error) => {
      console.error("Errore nel processo di prenotazione:", error);
      alert("Errore nel processo di prenotazione. Riprova.");
    });
};

const mostraPrenotazioni = (e) => {
  e.preventDefault();

  const risultatiContainer = document.getElementById("risultati-prenotazioni");
  risultatiContainer.innerHTML = "";

  if (!codiceFiscale) {
    alert("Per favore, inserisci un codice fiscale valido.");
    return;
  }

  fetch(`http://localhost:8080/prenotazioni/utente/${codiceFiscale}`)
    .then((res) => res.json())
    .then((prenotazioni) => {
      if (prenotazioni.length === 0) {
        risultatiContainer.innerHTML =
          "<span>Nessuna prenotazione trovata.</span>";
        return;
      }
      const tabella = document.createElement("table");
      tabella.innerHTML = `
          <thead>
            <tr>
                <th>Seleziona</th>
                <th>Volo</th>
                <th>Data</th>
                <th>Orario Decollo</th>
                <th>Orario Atterraggio</th>
            </tr>
          </thead>
          <tbody>
            ${prenotazioni
          .map(
            (prenotazione) => `
                  <tr>
                    <td>
                      <input type="radio" name="selezione-prenotazione" value="${prenotazione.id
              }" />
                    </td>
                    <td>${prenotazione.volo.compagnia.nome} (${prenotazione.volo.aeroportoPartenza.nome
              } - ${prenotazione.volo.aeroportoDestinazione.nome})</td>
                    <td>${formattaData(prenotazione.volo.data)}</td>
                    <td>${formattaOrario(prenotazione.volo.orarioDecollo)}</td>
                     <td>${formattaOrario(
                prenotazione.volo.orarioAtterraggio
              )}</td>
                  </tr>`
          )
          .join("")}
          </tbody>
          <button onclick="cancellaPrenotazione(event)" id="cancella-prenotazione-button">Cancella Prenotazione</button>
        `;
      risultatiContainer.appendChild(tabella);
      risultatiContainer.style.display = "block";
    })
    .catch((error) => {
      console.error("Errore nel recupero delle prenotazioni:", error);
      alert("Errore nel recupero delle prenotazioni. Riprova.");
    });
};

const cancellaPrenotazione = (e) => {
  e.preventDefault();

  const radioSelezionato = document.querySelector(
    'input[name="selezione-prenotazione"]:checked'
  );

  if (!radioSelezionato) {
    alert("Per favore, seleziona una prenotazione da cancellare.");
    return;
  }

  const idPrenotazione = radioSelezionato.value;

  fetch(`http://localhost:8080/prenotazioni/${idPrenotazione}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella risposta del server");
      }

      return;
    })
    .then((data) => {
      alert("Prenotazione cancellata con successo!");
      location.reload();
    })
    .catch((error) => {
      console.error("Errore nella cancellazione della prenotazione:", error);
      alert("Errore nel processo di cancellazione. Riprova.");
    });
};

const formattaData = (dataStringa) => {
  const data = new Date(dataStringa);
  const giorno = String(data.getDate()).padStart(2, "0");
  const mese = String(data.getMonth() + 1).padStart(2, "0");
  const anno = data.getFullYear();
  return `${giorno}/${mese}/${anno}`;
};

const formattaOrario = (orario) => {
  return orario.slice(0, 5);
};

const creaVolo = (e) => {
  e.preventDefault();
  const tendinaPartenzaCrea = document.getElementById("tendina-partenza-crea");
  const tendinaDestinazioneCrea = document.getElementById(
    "tendina-destinazione-crea"
  );
  console.log(tendinaDestinazioneCrea);
  const tendinaCompagniaCrea = document.getElementById(
    "tendina-compagnia-crea"
  );
  const dataPartenzaCrea = document.getElementById("data-partenza-crea");
  const orarioDecolloCrea = document.getElementById("orario-decollo-crea");
  const orarioAtterraggioCrea = document.getElementById(
    "orario-atterraggio-crea"
  );
  const postiTotaliCrea = document.getElementById("posti-disponibili-crea");

  const aeroportoPartenzaId =
    tendinaPartenzaCrea.options[tendinaPartenzaCrea.selectedIndex].getAttribute(
      "data-aeroporto-id"
    );
  const aeroportoDestinazioneId =
    tendinaDestinazioneCrea.options[
      tendinaDestinazioneCrea.selectedIndex
    ].getAttribute("data-aeroporto-id");
  const compagniaId =
    tendinaCompagniaCrea.options[
      tendinaCompagniaCrea.selectedIndex
    ].getAttribute("data-compagnia-id");

  const data = dataPartenzaCrea.value;
  const orarioDecollo = orarioDecolloCrea.value;
  const orarioAtterraggio = orarioAtterraggioCrea.value;
  const postiTotali = parseInt(postiTotaliCrea.value, 10);

  if (!aeroportoPartenzaId || !aeroportoDestinazioneId || !compagniaId) {
    alert("Seleziona aeroporto di partenza, destinazione e compagnia.");
    return;
  }
  if (aeroportoDestinazioneId === aeroportoPartenzaId) {
    alert("aereo di partenza e destinazione non possono essere uguali");
    return;
  }
  if (!data || !orarioDecollo || !orarioAtterraggio) {
    alert("Compila data e orari di decollo/atterraggio.");
    return;
  }
  if (postiTotali <= 0 || isNaN(postiTotali)) {
    alert("Inserisci un numero di posti totali maggiore di zero.");
    return;
  }

  const nuovoVolo = {
    aeroportoPartenzaId: parseInt(aeroportoPartenzaId, 10),
    aeroportoDestinazioneId: parseInt(aeroportoDestinazioneId, 10),
    compagniaId: parseInt(compagniaId, 10),
    data: data,
    orarioDecollo: orarioDecollo + ":00",
    orarioAtterraggio: orarioAtterraggio + ":00",
    postiTotali: postiTotali,
    postiDisponibili: postiTotali,
  };

  fetch("http://localhost:8080/voli", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuovoVolo),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Server ha restituito errore");
      return response.json();
    })
    .then((idCreato) => {
      alert("Volo creato con successo! Codice: " + idCreato);
      location.reload();
    })
    .catch((err) => {
      console.error("Errore durante la creazione del volo:", err);
      alert("Impossibile creare il volo. Controlla i dati e riprova.");
    });
};

const modificaVolo = (e) => {
  e.preventDefault();

  const idVoloModifica = document.getElementById("volo-id-input").value;
  const tendinaPartenzaModifica = document.getElementById("tendina-partenza-modifica");
  const tendinaDestinazioneModifica = document.getElementById("tendina-destinazione-modifica");
  const tendinaCompagniaModifica = document.getElementById("tendina-compagnia-modifica");
  const dataPartenzaModifica = document.getElementById("data-partenza-modifica");
  const orarioDecolloModifica = document.getElementById("orario-decollo-modifica");
  const orarioAtterraggioModifica = document.getElementById("orario-atterraggio-modifica");
  const postiTotaliModifica = document.getElementById("posti-totali-modifica");
  const postiDisponibiliiModifica = document.getElementById("posti-disponibili-modifica");

  const aeroportoPartenzaId = tendinaPartenzaModifica.options[
    tendinaPartenzaModifica.selectedIndex
  ].getAttribute("data-aeroporto-id");

  const aeroportoDestinazioneId = tendinaDestinazioneModifica.options[
    tendinaDestinazioneModifica.selectedIndex
  ].getAttribute("data-aeroporto-id");

  const compagniaId = tendinaCompagniaModifica.options[
    tendinaCompagniaModifica.selectedIndex
  ].getAttribute("data-compagnia-id");

  const data = dataPartenzaModifica.value;
  const orarioDecollo = orarioDecolloModifica.value;
  const orarioAtterraggio = orarioAtterraggioModifica.value;
  const postiTotali = parseInt(postiTotaliModifica.value, 10);
  const postiDisponibili = parseInt(postiDisponibiliiModifica.value,10);

  if (!idVoloModifica) {
    alert("ID volo mancante.");
    return;
  }
  if (!aeroportoPartenzaId || !aeroportoDestinazioneId || !compagniaId) {
    alert("Seleziona aeroporto di partenza, destinazione e compagnia.");
    return;
  }
  if (aeroportoDestinazioneId === aeroportoPartenzaId) {
    alert("Partenza e destinazione non possono coincidere.");
    return;
  }
  if (!data || !orarioDecollo || !orarioAtterraggio) {
    alert("Compila tutti i campi obbligatori.");
    return;
  }
  if (postiTotali <= 0 || isNaN(postiTotali)) {
    alert("Inserisci un numero valido di posti totali.");
    return;
  }
  if(postiTotali<postiDisponibili)
  {
    alert("i posti totali non possono essere minori dei posti disponibili");
    return;
  }

  const corpoRichiesta = {
    aeroportoPartenzaId,
    aeroportoDestinazioneId,
    compagniaId,
    data,
    orarioDecollo,
    orarioAtterraggio,
    postiTotali,
    postiDisponibili
  };

  fetch(`http://localhost:8080/voli/${idVoloModifica}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corpoRichiesta),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Errore nella modifica del volo.");
      return res.json();
    })
    .then((voloModificato) => {
      alert("Volo modificato con successo!");
      console.log("Volo aggiornato:", voloModificato);
    })
    .catch((err) => {
      console.error("Errore nella richiesta:", err);
      alert("Errore durante la modifica del volo.");
    });
};


const popolaModifica = (e) => {
  e.preventDefault();
  let idVolo = document.getElementById("volo-id-input").value;
  document.getElementById;
  fetch(`http://localhost:8080/voli/${idVolo}`)
    .then((res) => {
      if (!res.ok) throw new Error("Volo non trovato");
      return res.json();
    })
    .then((volo) => {
      const tendinaPartenzaModifica = document.getElementById(
        "tendina-partenza-modifica"
      );
      const tendinaDestinazioneModifica = document.getElementById(
        "tendina-destinazione-modifica"
      );
      const tendinaCompagniaModifica = document.getElementById(
        "tendina-compagnia-modifica"
      );
      const dataPartenzaModifica = document.getElementById(
        "data-partenza-modifica"
      );
      const orarioDecolloModifica = document.getElementById(
        "orario-decollo-modifica"
      );
      const orarioAtterraggioModifica = document.getElementById(
        "orario-atterraggio-modifica"
      );
      const postiTotaliModifica = document.getElementById(
        "posti-totali-modifica"
      );
      const postiDisponibiliiModifica = document.getElementById(
        "posti-disponibili-modifica"
      );
      tendinaPartenzaModifica.value = volo.aeroportoPartenza.nome;
      tendinaDestinazioneModifica.value = volo.aeroportoDestinazione.nome;
      tendinaCompagniaModifica.value = volo.compagnia.nome;
      dataPartenzaModifica.value = volo.data;
      orarioDecolloModifica.value = volo.orarioDecollo;
      orarioAtterraggioModifica.value = volo.orarioAtterraggio;
      postiTotaliModifica.value = volo.postiTotali;
      postiDisponibiliiModifica.value = volo.postiDisponibili;
    })
    .catch((err) => {
      console.error("Errore nel recupero del volo:", err);
      alert("Errore: volo non trovato");
    });
};

const cancellaVolo = (e) => {
  e.preventDefault();

  const idVoloCancella = document.getElementById("volo-id-input-cancella").value;

  if (!idVoloCancella) {
    alert("ID volo mancante.");
    return;
  }

  fetch(`http://localhost:8080/voli/${idVoloCancella}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) throw new Error("Errore nella cancellazione del volo.");
      alert("Volo cancellato con successo!");
      console.log(`Volo con ID ${idVoloCancella} cancellato.`);
    })
    .catch((err) => {
      console.error("Errore durante la cancellazione del volo:", err);
      alert("Errore durante la cancellazione del volo.");
    });
};


const logOut = (e) => {
  e.preventDefault();

  const conferma = confirm("Vuoi uscire?");

  if (conferma) {
    sessionStorage.clear();
    window.location.href = "html-home.html";
  }
};

const toggleSezione = (idSezione) => {
  const tutteLeSezioni = [
      "crea-per-admin",
      "modifica-per-admin",
      "cancella-per-admin",
      "tendina-partenza-destinazione",
      "tendina-orario",
      "tendina-compagnia",
      "risultati-voli-prenotati",
  ];

  tutteLeSezioni.forEach((sezione) => {
      const elemento = document.getElementById(sezione);
      const risultati = document.getElementById("risultati-voli");
      const risultatiPrenotazioni =document.getElementById("risultati-prenotazioni");
      risultati.innerHTML = " ";
      risultatiPrenotazioni.innerHTML =" ";
      if (elemento) {
          if (sezione === idSezione) {
              if (elemento.classList.contains("show")) {
                  elemento.classList.remove("show");
                  elemento.classList.add("hidden");
                  setTimeout(() => {
                      elemento.style.display = "none";
                      elemento.classList.remove("hidden");
                  }, 500); 
              } else {
                  elemento.style.display = "block";
                  setTimeout(() => {
                      elemento.classList.add("show");
                  }, 10); 
              }
          } else {
              elemento.classList.remove("show");
              elemento.classList.add("hidden");
              setTimeout(() => {
                  elemento.style.display = "none";
                  elemento.classList.remove("hidden");
              }, 500);
          }
      }
  });
};

document.addEventListener("click", (e) => {
  if (e.target.type === "radio" && e.target.name === "selezione-volo") {
      const righe = document.querySelectorAll("table tbody tr");
      righe.forEach((riga) => riga.classList.remove("selected"));
      e.target.closest("tr").classList.add("selected");
  }
});

const showModificaVolo = (e) =>{
  e.preventDefault();
  document.getElementById("show-modify").style.display = "block";
}

const scrollDown = (id) => {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
};

const mostraTuttiVoli = (e) => {
  e.preventDefault();

  const risultatiContainer = document.getElementById("risultati-voli");
  risultatiContainer.innerHTML = ""; // Pulizia contenuto precedente

  fetch("http://localhost:8080/voli")
    .then((res) => {
      if (!res.ok) throw new Error("Errore nella richiesta dei voli");
      return res.json();
    })
    .then((voli) => {
      if (voli.length === 0) {
        risultatiContainer.innerHTML = "<span>Nessun volo disponibile al momento.</span>";
        return;
      }

      const tabella = document.createElement("table");
      tabella.innerHTML = `
        <thead>
          <tr>
            <th>ID</th>
            <th>Compagnia</th>
            <th>Partenza</th>
            <th>Destinazione</th>
            <th>Data</th>
            <th>Orario Decollo</th>
            <th>Orario Atterraggio</th>
            <th>Posti Totali</th>
            <th>Posti Disponibili</th>
          </tr>
        </thead>
        <tbody>
          ${voli
            .map(
              (volo) => `
                <tr>
                  <td>${volo.codice}</td>
                  <td>${volo.compagnia.nome}</td>
                  <td>${volo.aeroportoPartenza.nome} (${volo.aeroportoPartenza.citta})</td>
                  <td>${volo.aeroportoDestinazione.nome} (${volo.aeroportoDestinazione.citta})</td>
                  <td>${formattaData(volo.data)}</td>
                  <td>${formattaOrario(volo.orarioDecollo)}</td>
                  <td>${formattaOrario(volo.orarioAtterraggio)}</td>
                  <td>${volo.postiTotali}</td>
                  <td>${volo.postiDisponibili}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      `;
      risultatiContainer.appendChild(tabella);
      risultatiContainer.style.display = "block";
    })
    .catch((err) => {
      console.error("Errore nel recupero dei voli:", err);
      risultatiContainer.innerHTML = "<span>Errore nel recupero dei voli.</span>";
    });
};
