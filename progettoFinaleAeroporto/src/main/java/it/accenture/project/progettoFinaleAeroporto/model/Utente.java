package it.accenture.project.progettoFinaleAeroporto.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
@Table(name = "utenti")
public class Utente {

	@Id
	@Size(min = 16, max = 16, message = "Errore il codice fiscale deve avere 16 caratteri")
	private String codiceFiscale;

	@Column(nullable = false)
	private String nome;

	@Column(nullable = false)
	private String cognome;

	@Column(nullable = false)
	private String indirizzo;

	@Column(unique = true, nullable = false)
	private String username;

    @Column(nullable=false)
	private String password;
    
	private boolean isAdmin;
	
	@Column(nullable = false)
	private String parolaSegreta;

    @JsonIgnore
	@OneToMany(mappedBy = "utente", cascade = CascadeType.ALL)
	private List<Prenotazione> prenotazioni;

}
