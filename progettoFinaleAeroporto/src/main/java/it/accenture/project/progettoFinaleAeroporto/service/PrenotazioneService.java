package it.accenture.project.progettoFinaleAeroporto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import it.accenture.project.progettoFinaleAeroporto.model.Prenotazione;
import it.accenture.project.progettoFinaleAeroporto.model.PrenotazioneInput;
import it.accenture.project.progettoFinaleAeroporto.model.Utente;
import it.accenture.project.progettoFinaleAeroporto.model.Volo;
import it.accenture.project.progettoFinaleAeroporto.repository.PrenotazioneRepository;
import it.accenture.project.progettoFinaleAeroporto.repository.UtenteRepository;
import it.accenture.project.progettoFinaleAeroporto.repository.VoloRepository;

@Service
public class PrenotazioneService {

	@Autowired
	private PrenotazioneRepository prenotazioneRepository;

	@Autowired
	private UtenteRepository utenteRepository;

	@Autowired
	private VoloRepository voloRepository;

	public ResponseEntity<Integer> creaPrenotazione(PrenotazioneInput prenotazioneInput) {
		Utente utente = utenteRepository.findById(prenotazioneInput.getUtenteId()).orElse(null);
		Volo volo = voloRepository.findById(prenotazioneInput.getVoloId()).orElse(null);
		if (utente != null && volo != null) {
			if (volo.getPostiDisponibili() > 0) {
				volo.setPostiDisponibili(volo.getPostiDisponibili() - 1);
				voloRepository.save(volo);
				Prenotazione prenotazione = new Prenotazione();
				prenotazione.setUtente(utente);
				prenotazione.setVolo(volo);
				return new ResponseEntity<Integer>(prenotazioneRepository.save(prenotazione).getId(), HttpStatus.OK);
			} else {
				return new ResponseEntity<Integer>(-1, HttpStatus.NOT_ACCEPTABLE);
			}
		} else {
			return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
		}
	}

	public List<Prenotazione> getPrenotazioni() {
		return prenotazioneRepository.findAll();
	}

	public ResponseEntity<Prenotazione> getPrenotazioneById(int id) {
		Prenotazione prenotazione = prenotazioneRepository.findById(id).orElse(null);
		if(prenotazione==null){
			return new ResponseEntity<Prenotazione>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Prenotazione>(prenotazione, HttpStatus.OK);
	}

	public List<Prenotazione> getPrenotazioneByUtente(String codiceFiscale) {
		return prenotazioneRepository.findByCodiceFiscale(codiceFiscale);
	}
	

	public void eliminaPrenotazione(int id) {
		Prenotazione prenotazioneDelete = prenotazioneRepository.findById(id).orElse(null);
		if (prenotazioneDelete != null) {
			Volo voloUpdate = prenotazioneDelete.getVolo();
			voloUpdate.setPostiDisponibili(voloUpdate.getPostiDisponibili() + 1);
			voloRepository.save(voloUpdate);		
		}
		prenotazioneRepository.deleteById(id);

	}

}