package eu.bausov.projects.pump_selector.bo;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "TB_PRODUCERS", uniqueConstraints = {@UniqueConstraint(columnNames = {"producerName", "producer_country"})})
@XmlRootElement
public class Producer extends JPA {

    private String producerName;
    private Constant producerCountry;

    public Producer() {
    }

    public Producer(String producerName, Constant producerCountry) {
        this.producerName = producerName;
        this.producerCountry = producerCountry;
    }

    @Basic(optional = false)
    public String getProducerName() {
        return producerName;
    }

    public void setProducerName(String producerName) {
        this.producerName = producerName;
    }

    @ManyToOne(optional = false)
    public Constant getProducerCountry() {
        return producerCountry;
    }

    public void setProducerCountry(Constant producerCountry) {
        this.producerCountry = producerCountry;
    }

    @Override
    @Transient
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Producer)) return false;

        Producer producer = (Producer) o;

        if (!producerName.equals(producer.producerName)) return false;
        return producerCountry.equals(producer.producerCountry);

    }

    @Override
    @Transient
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + producerName.hashCode();
        result = 31 * result + producerCountry.hashCode();
        return result;
    }
}
