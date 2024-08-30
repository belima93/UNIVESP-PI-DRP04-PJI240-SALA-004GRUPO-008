package com.RemediosPI1.RemediosPI1.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "prescricao_tb")
public class PrescricaoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Temporal(TemporalType.DATE)
    private LocalDate data;

    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private PacienteModel paciente;

    @ManyToMany
    @JoinTable(name = "prescricao_medicamento",
            joinColumns = @JoinColumn(name = "prescricao_id"),
            inverseJoinColumns = @JoinColumn(name = "medicamento_id"))
    private List<MedicamentoModel> medicamentos;

}