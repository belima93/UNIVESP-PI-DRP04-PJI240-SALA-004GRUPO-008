package com.RemediosPI1.RemediosPI1.tests;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.RemediosPI1.RemediosPI1.controllers.UsuarioController;
import com.RemediosPI1.RemediosPI1.models.UsuarioModel;
import com.RemediosPI1.RemediosPI1.repositories.UsuarioRepository;
import com.RemediosPI1.RemediosPI1.services.UsuarioService;

public class UsuarioControllerTest {

    private MockMvc mockMvc;

    @InjectMocks
    private UsuarioController usuarioController;

    @Mock
    private UsuarioService usuarioService;
    
    @Mock
    private UsuarioRepository usuarioRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = standaloneSetup(usuarioController).build();
    }

    @Test
    public void testCriarUsuarioComSucesso() throws Exception {
        UsuarioModel usuario = new UsuarioModel(1L, "novo_usuario", "usuario@gmail.com", "senha123");

        when(usuarioService.salvarUsuario(usuario)).thenReturn(usuario);

        String jsonRequest = """
        {
            "id": 1,
            "nomeUsuario": "novo_usuario",
            "email": "usuario@gmail.com", 
            "senha": "senha123"
        }
        """;

        mockMvc.perform(post("/usuarios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.nomeUsuario").value("novo_usuario"))
                .andExpect(jsonPath("$.email").value("usuario@gmail.com"))
                .andExpect(jsonPath("$.senha").value("senha123"));

        verify(usuarioService, times(1)).salvarUsuario(usuario);
    }
}
