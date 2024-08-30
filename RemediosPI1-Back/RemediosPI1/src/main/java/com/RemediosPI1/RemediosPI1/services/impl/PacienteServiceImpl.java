package com.RemediosPI1.RemediosPI1.services.impl;

import com.RemediosPI1.RemediosPI1.models.PacienteModel;
import com.RemediosPI1.RemediosPI1.repositories.PacienteRepository;
import com.RemediosPI1.RemediosPI1.services.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteServiceImpl implements PacienteService {  @Autowired
private PacienteRepository pacienteRepository;

    @Override
    public List<PacienteModel> getAllPacientes() {
        return pacienteRepository.findAll();
    }

    @Override
    public Optional<PacienteModel> getPacienteById(Long id) {
        return pacienteRepository.findById(id);
    }

    @Override
    public PacienteModel savePaciente(PacienteModel paciente) {
        return pacienteRepository.save(paciente);
    }

    @Override
    public void deletePaciente(Long id) {
        pacienteRepository.deleteById(id);
    }
}
