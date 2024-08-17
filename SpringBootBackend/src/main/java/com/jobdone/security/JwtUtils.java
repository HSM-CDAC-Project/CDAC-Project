package com.jobdone.security;

import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {

    @Value("${SECRET_KEY}")
    private String jwtSecret;

    @Value("${EXP_TIMEOUT}")
    private int jwtExpirationMs;

    private Key key;

    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    // Generate JWT token upon successful authentication
    public String generateJwtToken(Authentication authentication) {

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();

        return Jwts.builder() // JWT factory class to create tokens
                .setSubject(username) // Set the subject (username/email)
                .setIssuedAt(new Date()) // Set the issued at (iat) claim
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs)) // Set expiration
                .claim("authorities", getAuthoritiesInString(authorities)) // Add authorities as a claim
                .claim("userType", userDetails.getUserType()) // Add user type as a claim
                .signWith(key, SignatureAlgorithm.HS512) // Sign the JWT with key and algorithm
                .compact(); // Build and return the token
    }

    // This method will be invoked by our custom JWT filter to extract username from claims
    public String getUserNameFromJwtToken(Claims claims) {
        return claims.getSubject();
    }

    // This method validates the token and parses claims
    public Claims validateJwtToken(String jwtToken) {
        return parseClaims(jwtToken);
    }

    // Extract user type from the JWT token
    public String getUserTypeFromJwtToken(String token) {
        Claims claims = parseClaims(token);
        return (String) claims.get("userType");
    }

    // Parse claims from the token
    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Convert authorities to a comma-separated string
    private String getAuthoritiesInString(Collection<? extends GrantedAuthority> authorities) {
        return authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
    }

    // Extract authorities from claims
    public List<GrantedAuthority> getAuthoritiesFromClaims(Claims claims) {
        String authString = (String) claims.get("authorities");
        return AuthorityUtils.commaSeparatedStringToAuthorityList(authString);
    }
}
