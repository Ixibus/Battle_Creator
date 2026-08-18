package com.example.battle_creator.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public class ItemDto {

    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 100, message = "Le nom ne doit pas dépasser 100 caractères")
    private String name;

    @Size(max = 255, message = "L'utilité ne doit pas dépasser 255 caractères")
    private String utility;

    @NotNull(message = "Le prix estimé est obligatoire")
    @DecimalMin(value = "0.0", message = "Le prix doit être positif")
    private BigDecimal priceEstimation;

    @NotNull(message = "La quantité est obligatoire")
    @Min(value = 1, message = "La quantité doit être au moins 1")
    private Integer quantity;  // Integer au lieu de int pour permettre null

    private String source;

    public ItemDto() {};

    public ItemDto(String name, String utility, BigDecimal priceEstimation, Integer quantity, String source) {
        this.name = name;
        this.utility = utility;
        this.priceEstimation = priceEstimation;
        this.quantity = quantity;
        this.source = source;
    }

    // Getters
    public String getName() {
        return name;
    }

    public String getUtility() {
        return utility;
    }

    public BigDecimal getPriceEstimation() {
        return priceEstimation;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public String getSource() {
        return source;
    }

    // Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setUtility(String utility) {
        this.utility = utility;
    }

    public void setPriceEstimation(BigDecimal priceEstimation) {
        this.priceEstimation = priceEstimation;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setSource(String source) {
        this.source = source;
    }
}
