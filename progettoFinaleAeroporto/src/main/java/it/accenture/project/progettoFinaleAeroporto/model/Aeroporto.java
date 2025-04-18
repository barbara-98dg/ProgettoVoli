package it.accenture.project.progettoFinaleAeroporto.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "aeroporti")
public class Aeroporto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable=false)
	private String nome;
	
	@Column(nullable=false)
	private String citta;
	
	@Column(nullable=false)
	private String nazione;
	
	@JsonIgnore
	@OneToMany(mappedBy = "aeroportoPartenza", cascade = CascadeType.ALL)
	private List<Volo> partenze;
	
	@JsonIgnore
	@OneToMany(mappedBy = "aeroportoDestinazione", cascade = CascadeType.ALL)
	private List<Volo> destinazioni;

}
