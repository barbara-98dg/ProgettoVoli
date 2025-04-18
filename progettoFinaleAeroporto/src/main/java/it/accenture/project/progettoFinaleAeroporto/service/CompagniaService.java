package it.accenture.project.progettoFinaleAeroporto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import it.accenture.project.progettoFinaleAeroporto.model.Compagnia;
import it.accenture.project.progettoFinaleAeroporto.model.CompagniaInput;
import it.accenture.project.progettoFinaleAeroporto.repository.CompagniaRepository;

@Service
public class CompagniaService {
	
	@Autowired
	private CompagniaRepository compagniaRepository;
	
	public int creaCompagnia(CompagniaInput compagniaInput) {
		Compagnia compagnia = new Compagnia();
		compagnia.setNome(compagniaInput.getNome());
		return compagniaRepository.save(compagnia).getId();
	}
	
	public List<Compagnia> getCompagnie(){
		return compagniaRepository.findAll();
	}
	
	public ResponseEntity<Compagnia> getCompagniaById(int id) {
		Compagnia compagnia = compagniaRepository.findById(id).orElse(null);
		if(compagnia==null){
			return new ResponseEntity<Compagnia>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Compagnia>(compagnia, HttpStatus.OK);
	}
	
	public Compagnia getCompagniaByNome(String nome) { 
		return compagniaRepository.findByNome(nome);
	}
	
	public ResponseEntity<Compagnia> modificaCompagnia(int id, CompagniaInput compagniaInput) {
		Compagnia compagniaMod = compagniaRepository.findById(id).orElse(null);
		
		if(compagniaMod!=null) {
			compagniaMod.setNome(compagniaInput.getNome());
			return new ResponseEntity<Compagnia>(compagniaRepository.save(compagniaMod), HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	public void cancellaCompagnia(int id){
		compagniaRepository.deleteById(id);
	}


}
