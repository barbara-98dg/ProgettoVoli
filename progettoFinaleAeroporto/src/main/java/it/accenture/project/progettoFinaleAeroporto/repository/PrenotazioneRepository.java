package it.accenture.project.progettoFinaleAeroporto.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import it.accenture.project.progettoFinaleAeroporto.model.Prenotazione;

public interface PrenotazioneRepository extends JpaRepository<Prenotazione, Integer>{
	
	@Query("SELECT p FROM Prenotazione p WHERE p.utente.codiceFiscale = :codiceFiscale")
	public List<Prenotazione> findByCodiceFiscale(@Param("codiceFiscale") String codiceFiscale);
}
