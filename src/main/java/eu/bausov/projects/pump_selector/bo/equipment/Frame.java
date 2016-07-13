package eu.bausov.projects.pump_selector.bo.equipment;

import eu.bausov.projects.pump_selector.bo.Producer;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "TB_FRAMES", uniqueConstraints = {@UniqueConstraint(columnNames = {"modelName", "producer"})})
@XmlRootElement
public class Frame extends Equipment {
    private Set<Pump> suitablePumps;

    public Frame() {
    }

    public Frame(Producer producer, String modelName, BigDecimal price, Set<Pump> suitablePumps) {
        this.setProducer(producer);
        this.setModelName(modelName);
        this.setPrice(price);
        this.suitablePumps = suitablePumps;
    }

    @Fetch(FetchMode.SUBSELECT)
    @ManyToMany(fetch = FetchType.EAGER)
    public Set<Pump> getSuitablePumps() {
        return suitablePumps;
    }

    public void setSuitablePumps(Set<Pump> suitablePumps) {
        this.suitablePumps = suitablePumps;
    }
}