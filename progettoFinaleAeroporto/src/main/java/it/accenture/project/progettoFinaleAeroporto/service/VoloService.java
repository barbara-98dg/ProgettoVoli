package it.accenture.project.progettoFinaleAeroporto.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import it.accenture.project.progettoFinaleAeroporto.model.Aeroporto;
import it.accenture.project.progettoFinaleAeroporto.model.Compagnia;
import it.accenture.project.progettoFinaleAeroporto.model.Volo;
import it.accenture.project.progettoFinaleAeroporto.model.VoloInput;
import it.accenture.project.progettoFinaleAeroporto.repository.AeroportoRepository;
import it.accenture.project.progettoFinaleAeroporto.repository.CompagniaRepository;
import it.accenture.project.progettoFinaleAeroporto.repository.VoloRepository;

@Service
public class VoloService {

	@Autowired
	private VoloRepository voloRepository;

	@Autowired
	private CompagniaRepository compagniaRepository;

	@Autowired
	private AeroportoRepository aeroportoRepository;

	public ResponseEntity<Integer> creaVolo(VoloInput voloInput) {
		int idPartenza = voloInput.getAeroportoPartenzaId();
		int idDestinazione = voloInput.getAeroportoDestinazioneId();
		if(idPartenza!=idDestinazione) {
			Aeroporto aeroportoPa = aeroportoRepository.findById(idPartenza).orElse(null);
			Aeroporto aeroportoDe = aeroportoRepository.findById(idDestinazione).orElse(null);
			Compagnia compagnia = compagniaRepository.findById(voloInput.getCompagniaId()).orElse(null);
			if (aeroportoPa != null && aeroportoDe != null && compagnia != null) {
				Volo volo = new Volo();
				volo.setData(voloInput.getData());
				volo.setOrarioDecollo(voloInput.getOrarioDecollo());
				volo.setOrarioAtterraggio(voloInput.getOrarioAtterraggio());
				volo.setPostiDisponibili(voloInput.getPostiDisponibili());
				volo.setAeroportoDestinazione(aeroportoDe);
				volo.setAeroportoPartenza(aeroportoPa);
				volo.setCompagnia(compagnia);
				volo.setPostiTotali(voloInput.getPostiTotali());
				return new ResponseEntity<Integer>(voloRepository.save(volo).getCodice(), HttpStatus.OK);
			} else {
				return new ResponseEntity<Integer>(0, HttpStatus.NOT_FOUND);
			}
		}else {
			return new ResponseEntity<Integer>(-1, HttpStatus.NOT_ACCEPTABLE);
		}	
	}
	
	public List<Volo> getVoli(){
		return voloRepository.findAll();
	}

	public ResponseEntity<Volo> getVoloById(int id) {
		Volo volo = voloRepository.findById(id).orElse(null);
		if(volo==null){
			return new ResponseEntity<Volo>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Volo>(volo, HttpStatus.OK);
	}

	public List<Volo> getVoloByData(LocalDate data) {
		return voloRepository.findByData(data);
	}

	public ResponseEntity<Volo> modificaVolo(int codice, VoloInput voloInput) {
		Volo volo = voloRepository.findById(codice).orElse(null);
		if (volo != null) {
			Aeroporto aeroportoPa = aeroportoRepository.findById(voloInput.getAeroportoPartenzaId()).orElse(null);
			Aeroporto aeroportoDe = aeroportoRepository.findById(voloInput.getAeroportoDestinazioneId()).orElse(null);
			Compagnia compagnia = compagniaRepository.findById(voloInput.getCompagniaId()).orElse(null);
			if (aeroportoPa != null && aeroportoDe != null && compagnia != null) {
				volo.setAeroportoDestinazione(aeroportoDe);
				volo.setAeroportoPartenza(aeroportoPa);
				volo.setCompagnia(compagnia);
				volo.setData(voloInput.getData());
				volo.setOrarioDecollo(voloInput.getOrarioDecollo());
				volo.setOrarioAtterraggio(voloInput.getOrarioAtterraggio());
				volo.setPostiDisponibili(voloInput.getPostiDisponibili());
				volo.setPostiTotali(voloInput.getPostiTotali());
				return new ResponseEntity<Volo>(voloRepository.save(volo), HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
			}
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	public ResponseEntity<Volo> resettaVoloPostiDisponibili(int codice){
		Volo volo = voloRepository.findById(codice).orElse(null);
		if(volo != null) {
			volo.setPostiDisponibili(volo.getPostiTotali());
			return new ResponseEntity<Volo>(voloRepository.save(volo), HttpStatus.OK);
		}
		return new ResponseEntity<Volo>(HttpStatus.NOT_FOUND);
	}
	
	
	public void eliminaVolo(int codice) {
		voloRepository.deleteById(codice);
	}

}
