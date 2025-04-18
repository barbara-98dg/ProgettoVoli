package it.accenture.project.progettoFinaleAeroporto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import it.accenture.project.progettoFinaleAeroporto.model.Utente;
import it.accenture.project.progettoFinaleAeroporto.model.UtenteInput;
import it.accenture.project.progettoFinaleAeroporto.repository.UtenteRepository;

@Service
public class UtenteService {

	@Autowired
	private UtenteRepository utenteRepository;

	public ResponseEntity<String> creaUtente(UtenteInput utenteInput) {
		if (!utenteRepository.existsByUsername(utenteInput.getUsername())) {
			Utente utente = new Utente();
			utente.setCodiceFiscale(utenteInput.getCodiceFiscale());
			utente.setNome(utenteInput.getNome());
			utente.setCognome(utenteInput.getCognome());
			utente.setIndirizzo(utenteInput.getIndirizzo());
			utente.setUsername(utenteInput.getUsername());
			utente.setPassword(utenteInput.getPassword());
			utente.setAdmin(false);
			utente.setParolaSegreta(utenteInput.getParolaSegreta());
			return new ResponseEntity<String>(utenteRepository.save(utente).getCodiceFiscale(), HttpStatus.OK);
		}
		return new ResponseEntity<String>("", HttpStatus.NOT_ACCEPTABLE);
	}
	
	public List<Utente> getUtenti(){
		return utenteRepository.findAll();
	}

	public ResponseEntity<Utente> getUtenteById(String id) {
		Utente utente = utenteRepository.findById(id).orElse(null);
		if(utente == null){
			return new ResponseEntity<Utente>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Utente>(utente, HttpStatus.OK);
	}

	public ResponseEntity<Utente>getUtenteByUsername(String username) {
		Utente utente = utenteRepository.findByUsername(username);
		if(utente==null)
		{
			return new ResponseEntity<Utente>(HttpStatus.NOT_FOUND);
		}
		else {
			return new ResponseEntity<Utente>(utente,HttpStatus.OK);
		}
		
	}

	public boolean isAdmin(String id) {
		return utenteRepository.existsByUsername(id);
	}
	
	public ResponseEntity<Utente> modificaUtentePassword(String id, String parolaSegreta, String password){
		Utente utente = utenteRepository.findById(id).orElse(null);
		if(utente.getParolaSegreta().equalsIgnoreCase(parolaSegreta)) {
			utente.setPassword(password);
			return new ResponseEntity<Utente>(utenteRepository.save(utente), HttpStatus.OK);
		}
		return new ResponseEntity<Utente>(HttpStatus.NOT_MODIFIED);
	}

	public ResponseEntity<Utente> modificaUtente(String id, UtenteInput utenteInput) {
		Utente utenteMod = utenteRepository.findById(id).orElse(null);

		if (utenteMod != null) {
			if (!utenteRepository.existsByUsername(utenteInput.getUsername())) {
				utenteMod.setNome(utenteInput.getNome());
				utenteMod.setCognome(utenteInput.getCognome());
				utenteMod.setIndirizzo(utenteInput.getIndirizzo());
				utenteMod.setPassword(utenteInput.getPassword());
				utenteMod.setAdmin(false);
				utenteMod.setParolaSegreta(utenteInput.getParolaSegreta());
				return new ResponseEntity<Utente>(utenteRepository.save(utenteMod), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
			}
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	public void eliminaUtente(String id) {
		utenteRepository.deleteById(id);
	}

}
