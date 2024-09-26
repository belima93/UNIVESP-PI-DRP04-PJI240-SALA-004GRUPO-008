package com.RemediosPI1.RemediosPI1.repositories;

import com.RemediosPI1.RemediosPI1.models.UsuarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioModel, Long> {
    Optional<UsuarioModel> findByNomeUsuario(String nomeUsuario);
}
