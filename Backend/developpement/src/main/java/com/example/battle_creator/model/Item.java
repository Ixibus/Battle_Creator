package com.example.battle_creator.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "utility", length = 255, nullable = true)
    private String utility;

    @Column(name = "price_estimation", nullable = false)
    private BigDecimal priceEstimation;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "source", nullable = true)
    private String source;

    public Item() {}

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getUtility() {
        return utility;
    }

    public BigDecimal getPriceEstimation() {
        return priceEstimation;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getSource() {
        return source;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUtility(String utility) {
        this.utility = utility;
    }

    public void setPriceEstimation(BigDecimal priceEstimation) {
        this.priceEstimation = priceEstimation;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setSource(String source) {
        this.source = source;
    }
}
