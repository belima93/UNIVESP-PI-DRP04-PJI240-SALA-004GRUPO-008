package com.RemediosPI1.RemediosPI1.services.impl;

import com.RemediosPI1.RemediosPI1.exceptions.BusinessException;
import com.RemediosPI1.RemediosPI1.models.MedicamentoModel;
import com.RemediosPI1.RemediosPI1.models.PacienteModel;
import com.RemediosPI1.RemediosPI1.models.PrescricaoModel;
import com.RemediosPI1.RemediosPI1.repositories.MedicamentoRepository;
import com.RemediosPI1.RemediosPI1.repositories.PacienteRepository;
import com.RemediosPI1.RemediosPI1.repositories.PrescricaoRepository;
import com.RemediosPI1.RemediosPI1.services.PrescricaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PrescricaoServiceImpl implements PrescricaoService {


    @Autowired
    private MedicamentoRepository medicamentoRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private PrescricaoRepository prescricaoRepository;

    @Override
    public List<PrescricaoModel> getAllPrescricoes() {
        return prescricaoRepository.findAll();
    }

    @Override
    public Optional<PrescricaoModel> getPrescricaoById(Long id) {
        return Optional.empty();
    }

    @Override
    public PrescricaoModel savePrescricao(PrescricaoModel prescricao) throws Exception {
        PrescricaoModel prescricaoPersistir = new PrescricaoModel();

        prescricaoPersistir.setData(prescricao.getData());

        // Busca o paciente e associa no objeto prescricaoPersistir

        Optional<PacienteModel> pacienteBancoDados = pacienteRepository.findByNome(prescricao.getPaciente().getNome());

        if (pacienteBancoDados.isPresent()) {
            prescricaoPersistir.setPaciente(pacienteBancoDados.get());
        } else {
            throw new BusinessException("Paciente não encontrado!");
        }

        // Busca a lista de medicamentos e para cada um atualiza a quantidade no banco de dados e associa no objeto prescricaoPersistir

        List<MedicamentoModel> medicamentoListPersistir = new ArrayList<>();

        for (MedicamentoModel medicamento : prescricao.getMedicamentos()) {
            List<MedicamentoModel> medicamentoListBancoDados =
                    medicamentoRepository.findByFormulaAndQuantidadeGreaterThanOrderByVencimentoAsc(medicamento.getFormula(), 0);

            if (medicamentoListBancoDados.isEmpty()) {
                throw new BusinessException("Medicamento não encontrado!");
            }

            MedicamentoModel medicamentoBancoDados = medicamentoListBancoDados.get(0);

            this.atualizarQuantidadeMedicamento(medicamentoBancoDados);

            medicamentoListPersistir.add(medicamentoBancoDados);
        }

        prescricaoPersistir.setMedicamentos(medicamentoListPersistir);

        return prescricaoRepository.save(prescricaoPersistir);
    }

    private void atualizarQuantidadeMedicamento(MedicamentoModel medicamento) {
        medicamento.setQuantidade(medicamento.getQuantidade() - 1);

        medicamentoRepository.save(medicamento);
    }

    @Override
    public void deletePrescricao(Long id) {
        prescricaoRepository.deleteById(id);
    }
}
