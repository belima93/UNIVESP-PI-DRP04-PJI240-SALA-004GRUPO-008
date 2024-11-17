package com.RemediosPI1.RemediosPI1.tests;

import com.RemediosPI1.RemediosPI1.controllers.MedicamentoController;
import com.RemediosPI1.RemediosPI1.models.MedicamentoModel;
import com.RemediosPI1.RemediosPI1.services.MedicamentoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

public class MedicamentoControllerTest {

    private MockMvc mockMvc;

    @InjectMocks
    private MedicamentoController medicamentoController;

    @Mock
    private MedicamentoService medicamentoService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = standaloneSetup(medicamentoController).build();
    }

    @Test
    public void testGetAllMedicamentos() throws Exception {
        MedicamentoModel medicamento1 = new MedicamentoModel(1L, "Aspirina", 100, null, null);
        MedicamentoModel medicamento2 = new MedicamentoModel(2L, "Paracetamol", 50, null, null);

        when(medicamentoService.getAllMedicamentos()).thenReturn(Arrays.asList(medicamento1, medicamento2));

        mockMvc.perform(get("/api/medicamentos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].formula").value("Aspirina"))
                .andExpect(jsonPath("$[1].id").value(2L))
                .andExpect(jsonPath("$[1].formula").value("Paracetamol"))
                .andDo(print());

        verify(medicamentoService, times(1)).getAllMedicamentos();
    }

    @Test
    public void testGetMedicamentoByIdComSucesso() throws Exception {
        MedicamentoModel medicamento = new MedicamentoModel(1L, "Aspirina", 100, null, null);

        when(medicamentoService.getMedicamentoById(1L)).thenReturn(Optional.of(medicamento));

        mockMvc.perform(get("/medicamentos/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.formula").value("Aspirina"))
                .andDo(print());

        verify(medicamentoService, times(1)).getMedicamentoById(1L);
    }

    @Test
    public void testGetMedicamentoByIdNaoEncontrado() throws Exception {
        when(medicamentoService.getMedicamentoById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/medicamentos/1"))
                .andExpect(status().isNotFound())
                .andDo(print());

        verify(medicamentoService, times(1)).getMedicamentoById(1L);
    }

    @Test
    public void testSaveMedicamentoComSucesso() throws Exception {
        MedicamentoModel medicamento = new MedicamentoModel(1L, "Aspirina", 100, null, null);

        when(medicamentoService.saveMedicamento(any(MedicamentoModel.class))).thenReturn(medicamento);

        String jsonRequest = """
        {
            "id": 1,
            "formula": "Aspirina",
            "quantidade": 100
        }
        """;

        mockMvc.perform(post("/medicamentos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.formula").value("Aspirina"))
                .andExpect(jsonPath("$.quantidade").value(100))
                .andDo(print());

        verify(medicamentoService, times(1)).saveMedicamento(any(MedicamentoModel.class));
    }

    @Test
    public void testDeleteMedicamento() throws Exception {
        doNothing().when(medicamentoService).deleteMedicamento(1L);

        mockMvc.perform(delete("/medicamentos/1"))
                .andExpect(status().isNoContent())
                .andDo(print());

        verify(medicamentoService, times(1)).deleteMedicamento(1L);
    }
}
