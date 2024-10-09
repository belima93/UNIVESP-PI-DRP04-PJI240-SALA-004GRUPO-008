package com.RemediosPI1.RemediosPI1.tests;

import com.RemediosPI1.RemediosPI1.models.MedicamentoModel;
import com.RemediosPI1.RemediosPI1.repositories.MedicamentoRepository;
import com.RemediosPI1.RemediosPI1.services.impl.MedicamentoServiceImpl;
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

public class MedicamentoServiceImplTest {

    @InjectMocks
    private MedicamentoServiceImpl medicamentoService;

    @Mock
    private MedicamentoRepository medicamentoRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllMedicamentos() {
        MedicamentoModel medicamento1 = new MedicamentoModel(1L, "Aspirina", 100, null, null);
        MedicamentoModel medicamento2 = new MedicamentoModel(2L, "Ibuprofeno", 200, null, null);

        when(medicamentoRepository.findAll()).thenReturn(Arrays.asList(medicamento1, medicamento2));

        List<MedicamentoModel> medicamentos = medicamentoService.getAllMedicamentos();

        assertEquals(2, medicamentos.size());
        verify(medicamentoRepository, times(1)).findAll();
    }

    @Test
    public void testGetMedicamentoById() {
        MedicamentoModel medicamento = new MedicamentoModel(1L, "Aspirina", 100, null, null);
        when(medicamentoRepository.findById(1L)).thenReturn(Optional.of(medicamento));

        Optional<MedicamentoModel> foundMedicamento = medicamentoService.getMedicamentoById(1L);

        assertTrue(foundMedicamento.isPresent());
        assertEquals("Aspirina", foundMedicamento.get().getFormula());
        verify(medicamentoRepository, times(1)).findById(1L);
    }

    @Test
    public void testSaveMedicamento() {
        MedicamentoModel medicamento = new MedicamentoModel(1L, "Aspirina", 100, null, null);
        when(medicamentoRepository.save(medicamento)).thenReturn(medicamento);

        MedicamentoModel savedMedicamento = medicamentoService.saveMedicamento(medicamento);

        assertNotNull(savedMedicamento);
        assertEquals("Aspirina", savedMedicamento.getFormula());
        verify(medicamentoRepository, times(1)).save(medicamento);
    }

    @Test
    public void testDeleteMedicamento() {
        medicamentoService.deleteMedicamento(1L);
        verify(medicamentoRepository, times(1)).deleteById(1L);
    }
}
