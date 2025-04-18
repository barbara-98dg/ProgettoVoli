package it.accenture.project.progettoFinaleAeroporto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import it.accenture.project.progettoFinaleAeroporto.model.Prenotazione;
import it.accenture.project.progettoFinaleAeroporto.model.PrenotazioneInput;
import it.accenture.project.progettoFinaleAeroporto.service.PrenotazioneService;

@RestController
@RequestMapping("prenotazioni")
public class PrenotazioneController {

	@Autowired
	private PrenotazioneService prenotazioneService;

	@PostMapping
	public ResponseEntity<Integer> creaPrenotazione(@RequestBody PrenotazioneInput prenotazioneInput) {
		return prenotazioneService.creaPrenotazione(prenotazioneInput);
	}

	@GetMapping
	public List<Prenotazione> getPrenotazioni() {
		return prenotazioneService.getPrenotazioni();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Prenotazione> getPrenotazioneById(@PathVariable int id) {
		return prenotazioneService.getPrenotazioneById(id);
	}

	@GetMapping("/utente/{codiceFiscale}")
	public List<Prenotazione> getPrenotazioneByUtente(@PathVariable String codiceFiscale) {
		return prenotazioneService.getPrenotazioneByUtente(codiceFiscale);
	}

	@DeleteMapping("/{id}")
	public void eliminaPrenotazione(@PathVariable int id) {
		prenotazioneService.eliminaPrenotazione(id);
	}

}
