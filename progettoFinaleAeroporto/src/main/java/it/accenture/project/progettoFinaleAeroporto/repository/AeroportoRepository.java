package it.accenture.project.progettoFinaleAeroporto.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import it.accenture.project.progettoFinaleAeroporto.model.Aeroporto;

public interface AeroportoRepository extends JpaRepository<Aeroporto, Integer> {
	
	public List<Aeroporto> findByNome(String nome);
	
	public List<Aeroporto> findByCitta(String citta);
	
	public List<Aeroporto> findByNazione(String nazione);

}
