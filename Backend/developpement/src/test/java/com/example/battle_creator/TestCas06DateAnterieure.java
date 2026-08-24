package com.example.battle_creator;

import com.example.battle_creator.dto.ProjectDto;
import com.example.battle_creator.model.User;
import com.example.battle_creator.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test") // Charge src/test/resources/application-test.properties
@AutoConfigureMockMvc(addFilters = false)
@Transactional
class TestCas06DateAnterieure {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    private User savedUser;

    @BeforeEach
    void setUp() {
        objectMapper.registerModule(new JavaTimeModule());
        User user = new User();
        // Ajoute des setters si des champs de User sont indispensables à la création
        user.setLogin("testuser");
        user.setEmail("test@example.com");
        savedUser = userRepository.save(user);
    }

    @Test
    @DisplayName("Devrait retourner HTTP 400 quand la date du projet est dans le passé")
    void shouldReturnBadRequestWhenProjectDateIsInThePast() throws Exception {
        LocalDate pastDate = LocalDate.now().minusDays(1);

        ProjectDto projectDto = new ProjectDto(
                "Battle Hiphop",
                "Paris",
                pastDate,
                "Description du projet",
                savedUser.getId()
        );

        mockMvc.perform(post("/projects")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(projectDto)))
                .andDo(org.springframework.test.web.servlet.result.MockMvcResultHandlers.print())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("PROJECT_DATE_IN_PAST"))
                .andExpect(jsonPath("$.message").value("La date du projet ne peut pas être antérieure à aujourd'hui."));
    }
}