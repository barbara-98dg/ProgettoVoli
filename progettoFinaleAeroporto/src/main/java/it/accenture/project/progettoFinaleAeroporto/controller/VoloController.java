package it.accenture.project.progettoFinaleAeroporto.controller;

import java.time.LocalDate;
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

import it.accenture.project.progettoFinaleAeroporto.model.Volo;
import it.accenture.project.progettoFinaleAeroporto.model.VoloInput;
import it.accenture.project.progettoFinaleAeroporto.service.VoloService;

@RestController
@RequestMapping("voli")
public class VoloController {
	
	@Autowired
	private VoloService voloService;
	
	@PostMapping
	public ResponseEntity<Integer> creaVolo(@RequestBody VoloInput voloInput) {
		return voloService.creaVolo(voloInput);
	}
	
	@GetMapping
	public List<Volo> getVoli(){
		return voloService.getVoli();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Volo> getVoloById(@PathVariable int id) {
		return voloService.getVoloById(id);
	}
	
	@GetMapping("/date/{data}")
	public List<Volo> getVoloByData(@PathVariable LocalDate data) {
		return voloService.getVoloByData(data);
	}
	
	@PutMapping("/{codice}")
	public ResponseEntity<Volo> modificaVolo(@PathVariable int codice, @RequestBody VoloInput voloInput){
		return voloService.modificaVolo(codice, voloInput);
	}
	
	@PutMapping("/resetta/{codice}")
	public ResponseEntity<Volo> resettaVoloPostiDisponibili(@PathVariable int codice){
		return voloService.resettaVoloPostiDisponibili(codice);
	}
	
	@DeleteMapping("/{codice}")
	public void eliminaVolo(@PathVariable int codice) {
		voloService.eliminaVolo(codice);
	}

}
