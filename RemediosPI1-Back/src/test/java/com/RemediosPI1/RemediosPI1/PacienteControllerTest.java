package com.RemediosPI1.RemediosPI1.controllers;

import com.RemediosPI1.RemediosPI1.models.PacienteModel;
import com.RemediosPI1.RemediosPI1.services.PacienteService;
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

public class PacienteControllerTest {

    private MockMvc mockMvc;

    @InjectMocks
    private PacienteController pacienteController;

    @Mock
    private PacienteService pacienteService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = standaloneSetup(pacienteController).build();
    }

    @Test
    public void testGetAllPacientes() throws Exception {
        PacienteModel paciente1 = new PacienteModel(1L, "João da Silva", "Rua A", "123", "São Paulo", "SP", "12345678900", "123456789");
        PacienteModel paciente2 = new PacienteModel(2L, "Maria de Souza", "Rua B", "456", "Rio de Janeiro", "RJ", "98765432100", "987654321");

        when(pacienteService.getAllPacientes()).thenReturn(Arrays.asList(paciente1, paciente2));

        mockMvc.perform(get("/api/pacientes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].nome").value("João da Silva"))
                .andExpect(jsonPath("$[1].id").value(2L))
                .andExpect(jsonPath("$[1].nome").value("Maria de Souza"))
                .andDo(print());

        verify(pacienteService, times(1)).getAllPacientes();
    }

    @Test
    public void testGetPacienteByIdComSucesso() throws Exception {
        PacienteModel paciente = new PacienteModel(1L, "João da Silva", "Rua A", "123", "São Paulo", "SP", "12345678900", "123456789");

        when(pacienteService.getPacienteById(1L)).thenReturn(Optional.of(paciente));

        mockMvc.perform(get("/api/pacientes/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.nome").value("João da Silva"))
                .andDo(print());

        verify(pacienteService, times(1)).getPacienteById(1L);
    }

    @Test
    public void testGetPacienteByIdNaoEncontrado() throws Exception {
        when(pacienteService.getPacienteById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/pacientes/1"))
                .andExpect(status().isNotFound())
                .andDo(print());

        verify(pacienteService, times(1)).getPacienteById(1L);
    }

    @Test
    public void testSavePacienteComSucesso() throws Exception {
        PacienteModel paciente = new PacienteModel(1L, "João da Silva", "Rua A", "123", "São Paulo", "SP", "12345678900", "123456789");

        when(pacienteService.savePaciente(any(PacienteModel.class))).thenReturn(paciente);

        String jsonRequest = """
        {
            "id": 1,
            "nome": "João da Silva",
            "rua": "Rua A",
            "numero": "123",
            "cidade": "São Paulo",
            "estado": "SP",
            "cpf": "12345678900",
            "telefone": "123456789"
        }
        """;

        mockMvc.perform(post("/api/pacientes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.nome").value("João da Silva"))
                .andDo(print());

        verify(pacienteService, times(1)).savePaciente(any(PacienteModel.class));
    }

    @Test
    public void testDeletePaciente() throws Exception {
        doNothing().when(pacienteService).deletePaciente(1L);

        mockMvc.perform(delete("/api/pacientes/1"))
                .andExpect(status().isNoContent())
                .andDo(print());

        verify(pacienteService, times(1)).deletePaciente(1L);
    }
}
