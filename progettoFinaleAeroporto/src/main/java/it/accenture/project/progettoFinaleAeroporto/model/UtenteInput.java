package it.accenture.project.progettoFinaleAeroporto.model;

import lombok.Data;

@Data
public class UtenteInput {
	
	private String codiceFiscale;

	private String nome;

	private String cognome;

	private String indirizzo;

	private String username;

	private String password;
	
	private String parolaSegreta;
    

}
