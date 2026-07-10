package com.example.battle_creator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendBattleCreator {

    public static void main(String[] args) {
		System.out.println("oh mon dieu ça marche 😍");
        SpringApplication.run(BackendBattleCreator.class, args);

        //        var context = SpringApplication.run(BackendBattleCreator.class, args);
//
//        AuthentificationService service = context.getBean(AuthentificationService.class);
//        UserDetails userDetails = service.loadUserByUsername("testUser34");
//
//        System.out.println(userDetails);
    }

}
