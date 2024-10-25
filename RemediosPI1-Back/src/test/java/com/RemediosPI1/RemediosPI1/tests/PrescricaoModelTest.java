package com.RemediosPI1.RemediosPI1.tests;

import org.junit.jupiter.api.Test;

import com.RemediosPI1.RemediosPI1.models.PacienteModel;
import com.RemediosPI1.RemediosPI1.models.PrescricaoModel;

import static org.junit.jupiter.api.Assertions.*;
import java.time.LocalDate;
import java.util.ArrayList;

public class PrescricaoModelTest {

    @Test
    public void testPrescricaoModelGettersAndSetters() {
        PrescricaoModel prescricao = new PrescricaoModel();

        assertNull(prescricao.getId());
        assertNull(prescricao.getData());
        assertNull(prescricao.getPaciente());
        assertNull(prescricao.getMedicamentos());

        prescricao.setId(1L);
        prescricao.setData(LocalDate.of(2024, 12, 31));
        PacienteModel paciente = new PacienteModel();
        prescricao.setPaciente(paciente);
        prescricao.setMedicamentos(new ArrayList<>());

        assertEquals(1L, prescricao.getId());
        assertEquals(LocalDate.of(2024, 12, 31), prescricao.getData());
        assertEquals(paciente, prescricao.getPaciente());
        assertNotNull(prescricao.getMedicamentos());
    }

    @Test
    public void testPrescricaoModelAllArgsConstructor() {
        PacienteModel paciente = new PacienteModel();
        PrescricaoModel prescricao = new PrescricaoModel(1L, LocalDate.of(2024, 12, 31), paciente, new ArrayList<>());

        assertEquals(1L, prescricao.getId());
        assertEquals(LocalDate.of(2024, 12, 31), prescricao.getData());
        assertEquals(paciente, prescricao.getPaciente());
        assertNotNull(prescricao.getMedicamentos());
    }

    @Test
    public void testPrescricaoModelNoArgsConstructor() {
        PrescricaoModel prescricao = new PrescricaoModel();

        assertNull(prescricao.getId());
        assertNull(prescricao.getData());
        assertNull(prescricao.getPaciente());
        assertNull(prescricao.getMedicamentos());
    }
}
