package com.RemediosPI1.RemediosPI1.tests;

import com.RemediosPI1.RemediosPI1.models.UsuarioModel;
import com.RemediosPI1.RemediosPI1.repositories.UsuarioRepository;
import com.RemediosPI1.RemediosPI1.services.impl.UsuarioServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UsuarioServiceImplTest {

    @InjectMocks
    private UsuarioServiceImpl usuarioService;

    @Mock
    private UsuarioRepository usuarioRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAutenticarComSucesso() {
        UsuarioModel usuario = new UsuarioModel(1L, "usuario_teste", "usuario@gmail.com", "senha123");
        when(usuarioRepository.findByNomeUsuario("usuario_teste")).thenReturn(Optional.of(usuario));

        Optional<UsuarioModel> resultado = usuarioService.autenticar("usuario_teste", "senha123");

        assertTrue(resultado.isPresent());
        assertEquals("usuario_teste", resultado.get().getNomeUsuario());
        verify(usuarioRepository, times(1)).findByNomeUsuario("usuario_teste");
    }

    @Test
    public void testAutenticarComFalhaSenhaIncorreta() {
        UsuarioModel usuario = new UsuarioModel(1L, "usuario_teste", "usuario@gmail.com", "senha123");
        when(usuarioRepository.findByNomeUsuario("usuario_teste")).thenReturn(Optional.of(usuario));

        Optional<UsuarioModel> resultado = usuarioService.autenticar("usuario_teste", "senhaErrada");

        assertFalse(resultado.isPresent());
        verify(usuarioRepository, times(1)).findByNomeUsuario("usuario_teste");
    }

    @Test
    public void testAutenticarComFalhaUsuarioNaoEncontrado() {
        when(usuarioRepository.findByNomeUsuario("usuario_inexistente")).thenReturn(Optional.empty());

        Optional<UsuarioModel> resultado = usuarioService.autenticar("usuario_inexistente", "senha123");

        assertFalse(resultado.isPresent());
        verify(usuarioRepository, times(1)).findByNomeUsuario("usuario_inexistente");
    }

    @Test
    public void testSalvarUsuarioComSucesso() {
        UsuarioModel novoUsuario = new UsuarioModel(1L, "novo_usuario", "usuario@gmail.com", "senha123");
        when(usuarioRepository.findByNomeUsuario("novo_usuario")).thenReturn(Optional.empty());
        when(usuarioRepository.save(novoUsuario)).thenReturn(novoUsuario);

        UsuarioModel resultado = usuarioService.salvarUsuario(novoUsuario);

        assertNotNull(resultado);
        assertEquals("novo_usuario", resultado.getNomeUsuario());
        verify(usuarioRepository, times(1)).findByNomeUsuario("novo_usuario");
        verify(usuarioRepository, times(1)).save(novoUsuario);
    }

    @Test
    public void testSalvarUsuarioNomeExistente() {
        UsuarioModel usuarioExistente = new UsuarioModel(1L, "usuario_existente", "usuario@gmail.com","senha123");
        when(usuarioRepository.findByNomeUsuario("usuario_existente")).thenReturn(Optional.of(usuarioExistente));

        UsuarioModel novoUsuario = new UsuarioModel(2L, "usuario_existente", "usuario@gmail.com", "senha321");

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            usuarioService.salvarUsuario(novoUsuario);
        });

        assertEquals("Nome de usuário já existe!", exception.getMessage());
        verify(usuarioRepository, times(1)).findByNomeUsuario("usuario_existente");
        verify(usuarioRepository, never()).save(novoUsuario);
    }

    @Test
    public void testBuscarPorNomeUsuario() {
        UsuarioModel usuario = new UsuarioModel(1L, "usuario_teste", "usuario@gmail.com", "senha123");
        when(usuarioRepository.findByNomeUsuario("usuario_teste")).thenReturn(Optional.of(usuario));

        Optional<UsuarioModel> resultado = usuarioService.buscarPorNomeUsuario("usuario_teste");

        assertTrue(resultado.isPresent());
        assertEquals("usuario_teste", resultado.get().getNomeUsuario());
        verify(usuarioRepository, times(1)).findByNomeUsuario("usuario_teste");
    }
}
