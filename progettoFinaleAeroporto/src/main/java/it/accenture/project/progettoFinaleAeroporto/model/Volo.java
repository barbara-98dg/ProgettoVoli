package it.accenture.project.progettoFinaleAeroporto.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "voli")
public class Volo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int codice;
	
	@Column(nullable=false)
	private LocalDate data;
	
	@Column(nullable=false)
	private LocalTime orarioDecollo;
	
	@Column(nullable=false)
	private LocalTime orarioAtterraggio;
	
	@Column(nullable=false)
	private int postiDisponibili;
	
	@Column(nullable = false)
	private int postiTotali;
	
	@ManyToOne
	@JoinColumn(name = "compagnia_fk")
	private Compagnia compagnia;
	
	@ManyToOne
	@JoinColumn(name = "aeroporto_partenza_fk")
	private Aeroporto aeroportoPartenza;
	
	@ManyToOne
	@JoinColumn(name = "aeroporto_destinazione_fk")
	private Aeroporto aeroportoDestinazione;
	
	@JsonIgnore
	@OneToMany(mappedBy = "volo", cascade = CascadeType.ALL)
	private List<Prenotazione> prenotazioni;
	

}
