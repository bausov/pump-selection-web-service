package eu.bausov.projects.srvpumpselection.dao;

import eu.bausov.projects.srvpumpselection.bo.Constant;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by GreenNun on 18.03.17.
 */
public interface ConstantDAO extends CrudRepository<Constant, Long> {
    List<Constant> findAll();
}