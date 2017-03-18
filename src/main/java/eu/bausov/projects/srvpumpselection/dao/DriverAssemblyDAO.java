package eu.bausov.projects.srvpumpselection.dao;

import eu.bausov.projects.srvpumpselection.bo.equipment.DriverAssembly;
import eu.bausov.projects.srvpumpselection.bo.equipment.Frame;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by GreenNun on 18.03.17.
 */
public interface DriverAssemblyDAO extends CrudRepository<DriverAssembly, Long> {
    List<DriverAssembly> findAll();
}