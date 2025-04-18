package it.accenture.project.progettoFinaleAeroporto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import it.accenture.project.progettoFinaleAeroporto.model.Aeroporto;
import it.accenture.project.progettoFinaleAeroporto.model.AeroportoInput;
import it.accenture.project.progettoFinaleAeroporto.repository.AeroportoRepository;

@Service
public class AeroportoService {

	@Autowired
	private AeroportoRepository aeroportoRepository;

	public int creaAeroporto(AeroportoInput aeroportoInput) {
		Aeroporto aeroporto = new Aeroporto();
		aeroporto.setNome(aeroportoInput.getNome());
		aeroporto.setCitta(aeroportoInput.getCitta());
		aeroporto.setNazione(aeroportoInput.getNazione());
		return aeroportoRepository.save(aeroporto).getId();
	}
	
	public List<Aeroporto> getAeroporti(){
		return aeroportoRepository.findAll();
	}

	public ResponseEntity<Aeroporto> getAeroportoById(int id) {
		Aeroporto aeroporto = aeroportoRepository.findById(id).orElse(null);
		if(aeroporto==null){
			return new ResponseEntity<Aeroporto>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Aeroporto>(aeroporto, HttpStatus.OK);
	}

	public List<Aeroporto> getAeroportoByNome(String nome) {
		return aeroportoRepository.findByNome(nome);
	}

	public List<Aeroporto> getAeroportoByCitta(String citta) {
		return aeroportoRepository.findByCitta(citta);
	}

	public List<Aeroporto> getAeroportoByNazione(String nazione) {
		return aeroportoRepository.findByNazione(nazione);
	}

	public ResponseEntity<Aeroporto> modificaAeroporto(int id, AeroportoInput aeroportoInput) {
		Aeroporto aerMod = aeroportoRepository.findById(id).orElse(null);

		if (aerMod != null) {
			aerMod.setNome(aeroportoInput.getNome());
			aerMod.setCitta(aeroportoInput.getCitta());
			aerMod.setNazione(aeroportoInput.getNazione());
			return new ResponseEntity<Aeroporto>(aeroportoRepository.save(aerMod), HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	public void cancellaAeroporto(int id) {
		aeroportoRepository.deleteById(id);
	}

}
