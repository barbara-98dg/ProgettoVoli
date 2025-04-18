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

import it.accenture.project.progettoFinaleAeroporto.model.Compagnia;
import it.accenture.project.progettoFinaleAeroporto.model.CompagniaInput;
import it.accenture.project.progettoFinaleAeroporto.service.CompagniaService;

@RestController
@RequestMapping("compagnie")
public class CompagniaController {
	
	@Autowired
	private CompagniaService compagniaService;
	
	@PostMapping
	public int creaCompagnia(@RequestBody CompagniaInput compagniaInput) {
		return compagniaService.creaCompagnia(compagniaInput);
	}
	
	@GetMapping
	public List<Compagnia> getCompagnie(){
		return compagniaService.getCompagnie();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Compagnia> getCompagniaById(@PathVariable int id) {
		return compagniaService.getCompagniaById(id);
	}
	
	@GetMapping("/name/{nome}")
	public Compagnia getCompagniaByNome(@PathVariable String nome) {
		return compagniaService.getCompagniaByNome(nome);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Compagnia> modificaCompagnia(@PathVariable int id, @RequestBody CompagniaInput compagniaInput) {
		return compagniaService.modificaCompagnia(id, compagniaInput);
	}
	
	@DeleteMapping("/{id}")
	public void cancellaCompagnia(@PathVariable int id) {
		compagniaService.cancellaCompagnia(id);
	}
		

}
