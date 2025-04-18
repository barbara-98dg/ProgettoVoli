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

import it.accenture.project.progettoFinaleAeroporto.model.Aeroporto;
import it.accenture.project.progettoFinaleAeroporto.model.AeroportoInput;
import it.accenture.project.progettoFinaleAeroporto.service.AeroportoService;

@RestController
@RequestMapping("aeroporti")
public class AeroportoController {
	
	@Autowired
	private AeroportoService aeroportoService;
	
	@PostMapping
	public int creaAeroporto(@RequestBody AeroportoInput aeroportoInput) {
		return aeroportoService.creaAeroporto(aeroportoInput);
	}
	
	@GetMapping
	public List<Aeroporto> getAeroporti(){
		return aeroportoService.getAeroporti();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Aeroporto> getAeroportoById(@PathVariable int id) {
		return aeroportoService.getAeroportoById(id);
	}
	
	@GetMapping("/name/{nome}")
	public List<Aeroporto> getAeroportoByNome(@PathVariable String nome){
		return aeroportoService.getAeroportoByNome(nome);
	}
	
	@GetMapping("/city/{citta}")
	public List<Aeroporto> getAeroportoByCitta(@PathVariable String citta){
		return aeroportoService.getAeroportoByCitta(citta);
	}
	
	@GetMapping("/country/{nazione}")
	public List<Aeroporto> getAeroportoByNazione(@PathVariable String nazione){
		return aeroportoService.getAeroportoByNazione(nazione);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Aeroporto> modificaAeroporto(@PathVariable int id, @RequestBody AeroportoInput aeroportoInput){
		return aeroportoService.modificaAeroporto(id, aeroportoInput);
	}
	
	@DeleteMapping("/{id}")
	public void cancellaAeroporto(@PathVariable int id) {
		aeroportoService.cancellaAeroporto(id);
	}

}
