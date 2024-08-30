package com.RemediosPI1.RemediosPI1.services;

import java.util.List;
import java.util.Optional;

import com.RemediosPI1.RemediosPI1.models.PacienteModel;

public interface PacienteService {
    List<PacienteModel> getAllPacientes();
    Optional<PacienteModel> getPacienteById(Long id);
    PacienteModel savePaciente(PacienteModel paciente);
    void deletePaciente(Long id);
}
