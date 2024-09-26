package com.RemediosPI1.RemediosPI1.models;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.time.LocalDate;
import java.util.ArrayList;

public class MedicamentoModelTest {

    @Test
    public void testMedicamentoModelGettersAndSetters() {
        MedicamentoModel medicamento = new MedicamentoModel();

        assertNull(medicamento.getId());
        assertNull(medicamento.getFormula());
        assertEquals(0, medicamento.getQuantidade());
        assertNull(medicamento.getVencimento());
        assertNull(medicamento.getPrescricoes());

        medicamento.setId(1L);
        medicamento.setFormula("Aspirina");
        medicamento.setQuantidade(100);
        medicamento.setVencimento(LocalDate.of(2024, 12, 31));
        medicamento.setPrescricoes(new ArrayList<>());

        assertEquals(1L, medicamento.getId());
        assertEquals("Aspirina", medicamento.getFormula());
        assertEquals(100, medicamento.getQuantidade());
        assertEquals(LocalDate.of(2024, 12, 31), medicamento.getVencimento());
        assertNotNull(medicamento.getPrescricoes());
    }

    @Test
    public void testMedicamentoModelAllArgsConstructor() {
        MedicamentoModel medicamento = new MedicamentoModel(1L, "Aspirina", 100, LocalDate.of(2024, 12, 31), new ArrayList<>());

        assertEquals(1L, medicamento.getId());
        assertEquals("Aspirina", medicamento.getFormula());
        assertEquals(100, medicamento.getQuantidade());
        assertEquals(LocalDate.of(2024, 12, 31), medicamento.getVencimento());
        assertNotNull(medicamento.getPrescricoes());
    }

    @Test
    public void testMedicamentoModelNoArgsConstructor() {
        MedicamentoModel medicamento = new MedicamentoModel();

        assertNull(medicamento.getId());
        assertNull(medicamento.getFormula());
        assertEquals(0, medicamento.getQuantidade());
        assertNull(medicamento.getVencimento());
        assertNull(medicamento.getPrescricoes());
    }
}
