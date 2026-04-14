package com.example.battle_creator.service;

import com.example.battle_creator.model.Item;
import com.example.battle_creator.dto.ItemDto;
import com.example.battle_creator.repository.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> getAll() {
        return itemRepository.findAll();
    }

    public Optional<Item> getById(Long id) {
        validateId(id);
        return itemRepository.findById(id);
    }

    @Transactional
    public Item create(ItemDto itemDto) {
        validateItem(itemDto);

        Item itemCreated = new Item();

        itemCreated.setName(cleanText(itemDto.getName()));
        itemCreated.setUtility(cleanText(itemDto.getUtility()));
        itemCreated.setPriceEstimation(itemDto.getPriceEstimation());
        itemCreated.setQuantity(itemDto.getQuantity());
        itemCreated.setSource(cleanText(itemDto.getSource()));

        return itemRepository.save(itemCreated);
    }

    @Transactional
    public Item update(Long id, ItemDto itemDto) {
        validateId(id);
        validateItem(itemDto);

        Item existingItem = itemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Item introuvable avec l'id : " + id));

        existingItem.setName(cleanText(itemDto.getName()));
        existingItem.setUtility(cleanText(itemDto.getUtility()));
        existingItem.setPriceEstimation(itemDto.getPriceEstimation());
        existingItem.setQuantity(itemDto.getQuantity());
        existingItem.setSource(cleanText(itemDto.getSource()));

        return itemRepository.save(existingItem);
    }

    @Transactional
    public void delete(Long id) {
        validateId(id);

        if (!itemRepository.existsById(id)) {
            throw new IllegalArgumentException("Item introuvable avec l'id : " + id);
        }

        itemRepository.deleteById(id);
    }


    private void validateItem(ItemDto itemDto) {
        if (itemDto == null) {
            throw new IllegalArgumentException("L'item ne peut pas être vide.");
        }
        if (itemDto.getName() == null || itemDto.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Le nom est obligatoire.");
        }
        if (itemDto.getPriceEstimation() == null) {
            throw new IllegalArgumentException("Le prix estimé est obligatoire.");
        }
        if (itemDto.getQuantity() <= 0 || itemDto.getQuantity() == null) {
            throw new IllegalArgumentException("La quantité doit être de 0 ou plus.");
        }
    }

    private void validateId(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("L'id doit être positif.");
        }
    }

    private String cleanText(String text) {
        return text == null ? null : text.trim().replaceAll("\\s+", " ");
    }
}

