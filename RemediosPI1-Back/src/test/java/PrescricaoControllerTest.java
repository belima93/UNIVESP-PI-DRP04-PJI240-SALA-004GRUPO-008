package com.RemediosPI1.RemediosPI1.controllers;

import com.RemediosPI1.RemediosPI1.models.PrescricaoModel;
import com.RemediosPI1.RemediosPI1.services.PrescricaoService;
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

public class PrescricaoControllerTest {

    private MockMvc mockMvc;

    @InjectMocks
    private PrescricaoController prescricaoController;

    @Mock
    private PrescricaoService prescricaoService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = standaloneSetup(prescricaoController).build();
    }

    @Test
    public void testGetAllPrescricoes() throws Exception {
        PrescricaoModel prescricao1 = new PrescricaoModel(1L, null, null, null);
        PrescricaoModel prescricao2 = new PrescricaoModel(2L, null, null, null);

        when(prescricaoService.getAllPrescricoes()).thenReturn(Arrays.asList(prescricao1, prescricao2));

        mockMvc.perform(get("/api/prescricoes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[1].id").value(2L))
                .andDo(print());

        verify(prescricaoService, times(1)).getAllPrescricoes();
    }

    @Test
    public void testGetPrescricaoByIdComSucesso() throws Exception {
        PrescricaoModel prescricao = new PrescricaoModel(1L, null, null, null);

        when(prescricaoService.getPrescricaoById(1L)).thenReturn(Optional.of(prescricao));

        mockMvc.perform(get("/api/prescricoes/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andDo(print());

        verify(prescricaoService, times(1)).getPrescricaoById(1L);
    }

    @Test
    public void testGetPrescricaoByIdNaoEncontrada() throws Exception {
        when(prescricaoService.getPrescricaoById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/prescricoes/1"))
                .andExpect(status().isNotFound())
                .andDo(print());

        verify(prescricaoService, times(1)).getPrescricaoById(1L);
    }

    @Test
    public void testSavePrescricaoComSucesso() throws Exception {
        PrescricaoModel prescricao = new PrescricaoModel(1L, null, null, null);

        when(prescricaoService.savePrescricao(any(PrescricaoModel.class))).thenReturn(prescricao);

        String jsonRequest = """
        {
            "id": 1,
            "data": "2023-09-26",
            "paciente": null,
            "medicamentos": null
        }
        """;

        mockMvc.perform(post("/api/prescricoes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andDo(print());

        verify(prescricaoService, times(1)).savePrescricao(any(PrescricaoModel.class));
    }

    @Test
    public void testDeletePrescricao() throws Exception {
        doNothing().when(prescricaoService).deletePrescricao(1L);

        mockMvc.perform(delete("/api/prescricoes/1"))
                .andExpect(status().isNoContent())
                .andDo(print());

        verify(prescricaoService, times(1)).deletePrescricao(1L);
    }
}
