package com.example.copicom.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;


/**
 * Filtro JWT que se ejecuta en cada petición HTTP.
 * Se encarga de validar el token y autenticar al usuario.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    @Autowired
    private JwtUtils jwtUtils;


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {


        String path = request.getServletPath();


        // 🔓 Evita validar JWT en rutas públicas
        if (path.startsWith("/api/auth/") || 
            path.startsWith("/api/test/public") ||
            path.startsWith("/pedidos/rastrear")) {
            filterChain.doFilter(request, response);
            return;
        }


        try {
            String jwt = parseJwt(request);
            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
                String username = jwtUtils.getUserNameFromJwtToken(jwt);
                List<String> roles = jwtUtils.getRolesFromJwtToken(jwt);

                // Construir autoridades desde los roles del token
                // Spring Security requiere el prefijo "ROLE_" para hasRole()
                List<GrantedAuthority> authorities = roles.stream()
                        .map(role -> {
                            String roleName = role.toUpperCase();
                            // Asegurar que tenga el prefijo ROLE_
                            if (!roleName.startsWith("ROLE_")) {
                                roleName = "ROLE_" + roleName;
                            }
                            return new SimpleGrantedAuthority(roleName);
                        })
                        .collect(Collectors.toList());

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(username, null, authorities);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Registrar la autenticación en el contexto de seguridad
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else if (jwt != null) {
                // Token presente pero inválido
                logger.warn("Token JWT inválido o expirado para la petición: " + path);
            }
        } catch (Exception e) {
            logger.error("❌ No se pudo establecer la autenticación del usuario: " + e.getMessage(), e);
        }


        filterChain.doFilter(request, response);
    }


    /**
     * Extrae el token JWT del encabezado Authorization
     */
    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");


        if (headerAuth != null && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }
        return null;
    }
}

