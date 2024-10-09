package com.RemediosPI1.RemediosPI1.tests;

import com.RemediosPI1.RemediosPI1.models.PacienteModel;
import com.RemediosPI1.RemediosPI1.repositories.PacienteRepository;
import com.RemediosPI1.RemediosPI1.services.impl.PacienteServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class PacienteServiceImplTest {

    @InjectMocks
    private PacienteServiceImpl pacienteService;

    @Mock
    private PacienteRepository pacienteRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllPacientes() {
        PacienteModel paciente1 = new PacienteModel(1L, "João da Silva", "Rua A", "123", "São Paulo", "SP", "12345678900", "123456789");
        PacienteModel paciente2 = new PacienteModel(2L, "Maria de Souza", "Rua B", "456", "Rio de Janeiro", "RJ", "98765432100", "987654321");

        when(pacienteRepository.findAll()).thenReturn(Arrays.asList(paciente1, paciente2));

        List<PacienteModel> pacientes = pacienteService.getAllPacientes();

        assertEquals(2, pacientes.size());
        verify(pacienteRepository, times(1)).findAll();
    }

    @Test
    public void testGetPacienteById() {
        PacienteModel paciente = new PacienteModel(1L, "João da Silva", "Rua A", "123", "São Paulo", "SP", "12345678900", "123456789");
        when(pacienteRepository.findById(1L)).thenReturn(Optional.of(paciente));

        Optional<PacienteModel> foundPaciente = pacienteService.getPacienteById(1L);

        assertTrue(foundPaciente.isPresent());
        assertEquals("João da Silva", foundPaciente.get().getNome());
        verify(pacienteRepository, times(1)).findById(1L);
    }

    @Test
    public void testSavePaciente() {
        PacienteModel paciente = new PacienteModel(1L, "João da Silva", "Rua A", "123", "São Paulo", "SP", "12345678900", "123456789");
        when(pacienteRepository.save(paciente)).thenReturn(paciente);

        PacienteModel savedPaciente = pacienteService.savePaciente(paciente);

        assertNotNull(savedPaciente);
        assertEquals("João da Silva", savedPaciente.getNome());
        verify(pacienteRepository, times(1)).save(paciente);
    }

    @Test
    public void testDeletePaciente() {
        pacienteService.deletePaciente(1L);
        verify(pacienteRepository, times(1)).deleteById(1L);
    }
}

