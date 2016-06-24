package eu.bausov.projects.pump_selector.bo;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "TB_CONSTANTS", uniqueConstraints = { @UniqueConstraint(columnNames = { "name", "value" }) })
public class Constant extends JPA {
    private String name;
    private String value;

    @Basic(optional = false)
    public String getName() {
        return name;
    }

    public void setName(String label) {
        this.name = label;
    }

    @Basic(optional = false)
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Constant)) return false;

        Constant constant = (Constant) o;

        if (!name.equals(constant.name)) return false;
        return value.equals(constant.value);

    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + name.hashCode();
        result = 31 * result + value.hashCode();
        return result;
    }

    /**
     * Parses string value of Constant to integer type.
     *
     * @return int value
     */
    public int getIntegerValue(){
        return Integer.parseInt(value);
    }

    /**
     * Parses string value of Constant to double type.
     *
     * @return double value
     */
    public double getDoubleValue(){
        return Double.parseDouble(value);
    }
}