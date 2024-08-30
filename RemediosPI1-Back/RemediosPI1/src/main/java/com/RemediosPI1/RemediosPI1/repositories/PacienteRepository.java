package com.RemediosPI1.RemediosPI1.repositories;


import com.RemediosPI1.RemediosPI1.models.PacienteModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<PacienteModel, Long>  {
    Optional<PacienteModel> findByNome(String nome);
}
