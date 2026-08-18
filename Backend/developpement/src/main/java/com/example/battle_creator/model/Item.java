package com.example.battle_creator.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "items")
public class Item {   // 1. Nom de classe au singulier

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    // 2. En DB : utility peut être NULL → nullable = true (ou on enlève le paramètre)
    @Column(name = "utility", length = 255, nullable = true)
    private String utility;

    // 3. DECIMAL en PostgreSQL → BigDecimal côté Java
    @Column(name = "price_estimation", nullable = false)
    private BigDecimal priceEstimation;

    // 4. INT en DB → Integer ou int, les deux sont OK
    @Column(name = "quantity", nullable = false)
    private int quantity;

    // 5. TEXT en DB → String côté Java (pas besoin de length)
    @Column(name = "source", nullable = true)
    private String source;

    // 6. Constructeur sans argument obligatoire pour JPA
    public Item() {
    }

//    // 7. Constructeur pratique si pas DTO d'installé dans le controller et le service avec ses methodes
//    public Item(Long id,
//                String name,
//                String utility,
//                BigDecimal priceEstimation,
//                int quantity,
//                String source) {
//        this.id = id;
//        this.name = name;
//        this.utility = utility;
//        this.priceEstimation = priceEstimation;
//        this.quantity = quantity;
//        this.source = source;
//    }

    // Getters

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

    // Setters

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
