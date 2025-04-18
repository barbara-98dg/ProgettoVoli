package it.accenture.project.progettoFinaleAeroporto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.accenture.project.progettoFinaleAeroporto.model.Compagnia;


public interface CompagniaRepository extends JpaRepository<Compagnia, Integer> {

	public Compagnia findByNome(String nome);
}
