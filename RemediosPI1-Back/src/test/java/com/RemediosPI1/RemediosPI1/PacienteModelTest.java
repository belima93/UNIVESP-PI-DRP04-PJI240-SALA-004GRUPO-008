package com.RemediosPI1.RemediosPI1;


import com.RemediosPI1.RemediosPI1.models.PacienteModel;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class PacienteModelTest {

    @Test
    public void testPacienteModelGettersAndSetters() {
        PacienteModel paciente = new PacienteModel();

        assertNull(paciente.getId());
        assertNull(paciente.getNome());
        assertNull(paciente.getRua());
        assertNull(paciente.getNumero());
        assertNull(paciente.getCidade());
        assertNull(paciente.getEstado());
        assertNull(paciente.getCpf());
        assertNull(paciente.getTelefone());

        paciente.setId(1L);
        paciente.setNome("João da Silva");
        paciente.setRua("Rua das Flores");
        paciente.setNumero("123A");
        paciente.setCidade("São Paulo");
        paciente.setEstado("SP");
        paciente.setCpf("123.456.789-00");
        paciente.setTelefone("(11) 98765-4321");

        assertEquals(1L, paciente.getId());
        assertEquals("João da Silva", paciente.getNome());
        assertEquals("Rua das Flores", paciente.getRua());
        assertEquals("123A", paciente.getNumero());
        assertEquals("São Paulo", paciente.getCidade());
        assertEquals("SP", paciente.getEstado());
        assertEquals("123.456.789-00", paciente.getCpf());
        assertEquals("(11) 98765-4321", paciente.getTelefone());
    }

    @Test
    public void testPacienteModelAllArgsConstructor() {
        PacienteModel paciente = new PacienteModel(1L, "João da Silva", "Rua das Flores", "123A", "São Paulo", "SP", "123.456.789-00", "(11) 98765-4321");

        assertEquals(1L, paciente.getId());
        assertEquals("João da Silva", paciente.getNome());
        assertEquals("Rua das Flores", paciente.getRua());
        assertEquals("123A", paciente.getNumero());
        assertEquals("São Paulo", paciente.getCidade());
        assertEquals("SP", paciente.getEstado());
        assertEquals("123.456.789-00", paciente.getCpf());
        assertEquals("(11) 98765-4321", paciente.getTelefone());
    }

    @Test
    public void testPacienteModelNoArgsConstructor() {
        PacienteModel paciente = new PacienteModel();

        assertNull(paciente.getId());
        assertNull(paciente.getNome());
        assertNull(paciente.getRua());
        assertNull(paciente.getNumero());
        assertNull(paciente.getCidade());
        assertNull(paciente.getEstado());
        assertNull(paciente.getCpf());
        assertNull(paciente.getTelefone());
    }
}
