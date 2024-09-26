package com.RemediosPI1.RemediosPI1.services.impl;

import com.RemediosPI1.RemediosPI1.exceptions.BusinessException;
import com.RemediosPI1.RemediosPI1.models.MedicamentoModel;
import com.RemediosPI1.RemediosPI1.models.PacienteModel;
import com.RemediosPI1.RemediosPI1.models.PrescricaoModel;
import com.RemediosPI1.RemediosPI1.repositories.MedicamentoRepository;
import com.RemediosPI1.RemediosPI1.repositories.PacienteRepository;
import com.RemediosPI1.RemediosPI1.repositories.PrescricaoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class PrescricaoServiceImplTest {

    @InjectMocks
    private PrescricaoServiceImpl prescricaoService;

    @Mock
    private MedicamentoRepository medicamentoRepository;

    @Mock
    private PacienteRepository pacienteRepository;

    @Mock
    private PrescricaoRepository prescricaoRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllPrescricoes() {
        PrescricaoModel prescricao1 = new PrescricaoModel(1L, LocalDate.now(), null, null);
        PrescricaoModel prescricao2 = new PrescricaoModel(2L, LocalDate.now(), null, null);

        when(prescricaoRepository.findAll()).thenReturn(List.of(prescricao1, prescricao2));

        List<PrescricaoModel> result = prescricaoService.getAllPrescricoes();

        assertEquals(2, result.size());
        verify(prescricaoRepository, times(1)).findAll();
    }

    @Test
    public void testGetPrescricaoById() {
        PrescricaoModel prescricao = new PrescricaoModel(1L, LocalDate.now(), null, null);
        when(prescricaoRepository.findById(1L)).thenReturn(Optional.of(prescricao));

        Optional<PrescricaoModel> result = prescricaoService.getPrescricaoById(1L);

        assertTrue(result.isPresent());
        assertEquals(1L, result.get().getId());
        verify(prescricaoRepository, times(1)).findById(1L);
    }

    @Test
    public void testGetPrescricaoByIdNaoEncontrado() {
        when(prescricaoRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<PrescricaoModel> result = prescricaoService.getPrescricaoById(1L);

        assertFalse(result.isPresent());
        verify(prescricaoRepository, times(1)).findById(1L);
    }

    @Test
    public void testSavePrescricaoComSucesso() throws Exception {
        PacienteModel paciente = new PacienteModel(1L, "João da Silva", "Rua A", "123", "São Paulo", "SP", "12345678900", "123456789");
        MedicamentoModel medicamento = new MedicamentoModel(1L, "Aspirina", 10, LocalDate.now(), new ArrayList<>());
        PrescricaoModel prescricao = new PrescricaoModel();
        prescricao.setPaciente(paciente);
        prescricao.setMedicamentos(List.of(medicamento));
        prescricao.setData(LocalDate.now());

        when(pacienteRepository.findByNome("João da Silva")).thenReturn(Optional.of(paciente));
        when(medicamentoRepository.findByFormulaAndQuantidadeGreaterThanOrderByVencimentoAsc("Aspirina", 0)).thenReturn(List.of(medicamento));
        when(prescricaoRepository.save(any(PrescricaoModel.class))).thenReturn(prescricao);

        PrescricaoModel result = prescricaoService.savePrescricao(prescricao);

        assertNotNull(result);
        assertEquals(paciente, result.getPaciente());
        assertEquals(1, result.getMedicamentos().size());
        verify(pacienteRepository, times(1)).findByNome("João da Silva");
        verify(medicamentoRepository, times(1)).findByFormulaAndQuantidadeGreaterThanOrderByVencimentoAsc("Aspirina", 0);
        verify(prescricaoRepository, times(1)).save(any(PrescricaoModel.class));
    }

    @Test
    public void testSavePrescricaoPacienteNaoEncontrado() {
        PrescricaoModel prescricao = new PrescricaoModel();
        prescricao.setPaciente(new PacienteModel(null, "Paciente Inexistente", null, null, null, null, null, null));
        prescricao.setMedicamentos(new ArrayList<>());

        when(pacienteRepository.findByNome(anyString())).thenReturn(Optional.empty());

        Exception exception = assertThrows(BusinessException.class, () -> {
            prescricaoService.savePrescricao(prescricao);
        });

        assertEquals("Paciente não encontrado!", exception.getMessage());
        verify(pacienteRepository, times(1)).findByNome(anyString());
        verify(medicamentoRepository, never()).findByFormulaAndQuantidadeGreaterThanOrderByVencimentoAsc(anyString(), anyInt());
    }

    @Test
    public void testSavePrescricaoMedicamentoNaoEncontrado() {
        PacienteModel paciente = new PacienteModel(1L, "João da Silva", "Rua A", "123", "São Paulo", "SP", "12345678900", "123456789");
        PrescricaoModel prescricao = new PrescricaoModel();
        prescricao.setPaciente(paciente);

        MedicamentoModel medicamento = new MedicamentoModel();
        medicamento.setFormula("Aspirina");
        prescricao.setMedicamentos(List.of(medicamento));

        when(pacienteRepository.findByNome("João da Silva")).thenReturn(Optional.of(paciente));
        when(medicamentoRepository.findByFormulaAndQuantidadeGreaterThanOrderByVencimentoAsc("Aspirina", 0)).thenReturn(new ArrayList<>());

        Exception exception = assertThrows(BusinessException.class, () -> {
            prescricaoService.savePrescricao(prescricao);
        });

        assertEquals("Medicamento não encontrado!", exception.getMessage());
        verify(medicamentoRepository, times(1)).findByFormulaAndQuantidadeGreaterThanOrderByVencimentoAsc("Aspirina", 0);
        verify(prescricaoRepository, never()).save(any(PrescricaoModel.class));
    }

    @Test
    public void testDeletePrescricao() {
        prescricaoService.deletePrescricao(1L);

        verify(prescricaoRepository, times(1)).deleteById(1L);
    }
}
