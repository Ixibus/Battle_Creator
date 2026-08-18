package com.example.battle_creator.controller;


import com.example.battle_creator.dto.ItemDto;
import com.example.battle_creator.model.Item;
import com.example.battle_creator.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/items")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService){
        this.itemService = itemService;
    }

    @GetMapping
    public ResponseEntity<List<Item>> allItems(){
        return ResponseEntity.ok(itemService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> itemById(@PathVariable Long id){
        return itemService.getById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Item> createItem(@Valid @RequestBody ItemDto itemDto) {
        Item itemCreated = itemService.create(itemDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(itemCreated);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @Valid @RequestBody ItemDto itemDto) {
        Item itemUpdated = itemService.update(id, itemDto);
        return ResponseEntity.ok(itemUpdated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.delete(id);
        return ResponseEntity.noContent().build();
    }

}