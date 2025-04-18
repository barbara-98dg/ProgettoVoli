package it.accenture.project.progettoFinaleAeroporto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.accenture.project.progettoFinaleAeroporto.model.Utente;

public interface UtenteRepository extends JpaRepository<Utente, String>{
	
	public boolean existsByUsername(String username);
	public Utente findByUsername(String username);
	
}
