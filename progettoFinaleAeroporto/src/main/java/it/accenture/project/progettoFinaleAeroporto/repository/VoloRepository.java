package it.accenture.project.progettoFinaleAeroporto.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.accenture.project.progettoFinaleAeroporto.model.Aeroporto;
import it.accenture.project.progettoFinaleAeroporto.model.Compagnia;
import it.accenture.project.progettoFinaleAeroporto.model.Volo;
import java.time.LocalDate;


public interface VoloRepository extends JpaRepository<Volo, Integer>{
	
	public List<Volo> findByAeroportoPartenza(Aeroporto aeroportoPartenza);
	
	public List<Volo> findByAeroportoDestinazione(Aeroporto aeroportoDestinazione);
	
	public List<Volo> findByCompagnia(Compagnia compagnia);
	
	public List<Volo> findByData(LocalDate data);
	

}
