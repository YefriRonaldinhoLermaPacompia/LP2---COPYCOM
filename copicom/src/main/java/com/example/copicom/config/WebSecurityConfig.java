package com.example.copicom.config;

import com.example.copicom.security.jwt.JwtAuthEntryPoint;
import com.example.copicom.security.jwt.JwtAuthenticationFilter;
import com.example.copicom.service.impl.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig  {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtAuthEntryPoint unauthorizedHandler;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        return http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())
                .exceptionHandling(ex -> ex.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth

                        // ================================
                        //   RUTAS PÚBLICAS
                        // ================================
                        .requestMatchers("/api/auth/**", "/api/test/public").permitAll()
                        .requestMatchers("/pedidos/rastrear").permitAll() // Rastreo de pedidos público

                        // ================================
                        //   RUTAS ADMIN
                        // ================================
                        .requestMatchers("/api/admin/**", "/categorias/admin/**")
                        .hasRole("ADMIN")

                        // ================================
                        //   CATEGORÍAS
                        // ================================
                        .requestMatchers("/categorias/crear", "/categorias/editar/**")
                        .hasAnyRole("ADMIN", "VENDEDOR")

                        .requestMatchers("/categorias/eliminar/**")
                        .hasRole("ADMIN")

                        // ================================
                        //   RUTAS SECUNDARIAS HABILITADAS (NUEVO)
                        // ================================
                        .requestMatchers("/tamanos/**")
                        .hasAnyRole("ADMIN", "VENDEDOR", "USER")
                        .requestMatchers("/colores/**")
                        .hasAnyRole("ADMIN", "VENDEDOR", "USER")
                        .requestMatchers("/materiales/**")
                        .hasAnyRole("ADMIN", "VENDEDOR", "USER")
                        .requestMatchers("/acabados/**")
                        .hasAnyRole("ADMIN", "VENDEDOR", "USER")
                        .requestMatchers("/servicios/**")
                        .hasAnyRole("ADMIN", "VENDEDOR", "USER")
                        .requestMatchers("/tipos-generacion/**")
                        .hasAnyRole("ADMIN", "VENDEDOR", "USER")
                        .requestMatchers("/ventas/**")
                        .hasAnyRole("ADMIN", "VENDEDOR", "USER")
                        // ================================
                        //   CUALQUIER OTRA RUTA
                        // ================================
                        .anyRequest().authenticated()
                )

                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
