package com.RemediosPI1.RemediosPI1.repositories;

import com.RemediosPI1.RemediosPI1.models.PrescricaoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrescricaoRepository extends JpaRepository<PrescricaoModel, Long> {
}
