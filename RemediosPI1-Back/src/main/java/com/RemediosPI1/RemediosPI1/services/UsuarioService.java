package com.RemediosPI1.RemediosPI1.services;

import com.RemediosPI1.RemediosPI1.models.UsuarioModel;

import java.util.Optional;

public interface UsuarioService {
    Optional<UsuarioModel> autenticar(String nomeUsuario, String senha);
    UsuarioModel salvarUsuario(UsuarioModel usuario);
    Optional<UsuarioModel> buscarPorNomeUsuario(String nomeUsuario);
}
