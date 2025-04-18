package it.accenture.project.progettoFinaleAeroporto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.accenture.project.progettoFinaleAeroporto.model.Utente;
import it.accenture.project.progettoFinaleAeroporto.model.UtenteInput;
import it.accenture.project.progettoFinaleAeroporto.service.UtenteService;

@RestController
@RequestMapping("utenti")
public class UtenteController {
	
	@Autowired
	private UtenteService utenteService;
	
	@PostMapping
	public ResponseEntity<String> creaUtente(@RequestBody UtenteInput utenteInput) {
		return utenteService.creaUtente(utenteInput);
	}
	
	@GetMapping
	public List<Utente> getUtenti(){
		return utenteService.getUtenti();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Utente> getUtenteById(@PathVariable String id) {
		return utenteService.getUtenteById(id);
	}
	
	@GetMapping("/username/{username}")
	public ResponseEntity<Utente> getUtenteByUsername(@PathVariable String username) {
		return utenteService.getUtenteByUsername(username);
	}
	
	@GetMapping("/isAdmin/{id}")
	public boolean isAdmin(@PathVariable String id) {
		return utenteService.isAdmin(id);
	}
	
	@PutMapping("/{id}/{parolaSegreta}/{password}")
	public ResponseEntity<Utente> modificaUtentePassword(@PathVariable String id, @PathVariable String parolaSegreta, @PathVariable String password){
		return utenteService.modificaUtentePassword(id, parolaSegreta, password);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Utente> modificaUtente(@PathVariable String id, @RequestBody UtenteInput utenteInput){
		return utenteService.modificaUtente(id, utenteInput);
	}
	
	@DeleteMapping("/{id}")
	public void eliminaUtente(@PathVariable String id) {
		utenteService.eliminaUtente(id);
	}

}
