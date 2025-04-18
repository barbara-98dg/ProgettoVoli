package it.accenture.project.progettoFinaleAeroporto.model;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class VoloInput {
	
	private LocalDate data;
	private LocalTime orarioDecollo;
	private LocalTime orarioAtterraggio;
	private int postiDisponibili;
	private int postiTotali;
	
	private int compagniaId;
	private int aeroportoPartenzaId;
	private int aeroportoDestinazioneId;

}
