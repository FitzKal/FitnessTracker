package com.undieb.hu.main.Services;

import com.undieb.hu.main.Exceptions.TokenNotFoundException;
import com.undieb.hu.main.Models.JWTBlackListedTokens;
import com.undieb.hu.main.Repositories.JWTBlackListRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.function.Function;

@Service
public class JWTService {
    private final String secretKey;
    @Autowired
    private JWTBlackListRepository blackListRepository;




    public JWTService(){
        try{
            KeyGenerator keyGenerator = KeyGenerator.getInstance("HmacSHA256");
            SecretKey key = keyGenerator.generateKey();
            secretKey = Base64.getEncoder().encodeToString(key.getEncoded());

        }catch (NoSuchAlgorithmException e){
            throw new RuntimeException(e);
        }
   }

   public String generateToken(String username){
       Map<String, Objects> claims = new HashMap<>();

       return Jwts.builder()
               .claims()
               .subject(username)
               .issuedAt(new Date(System.currentTimeMillis()))
               .expiration(new Date(System.currentTimeMillis()  + 1000 * 60 * 30))
               .and()
               .signWith(getKey())
               .compact();
   }

    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String getUserNameFromToken(String token){
        return extractClaim(token,Claims::getSubject);
    }

    public String extractTokenFromRequest (HttpServletRequest request){
        var header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")){
            var token = header.substring(7);
            return token;
        }else{
            throw new TokenNotFoundException("The token was not found");
        }
    }

    private Claims extractAllClaims(String token){
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private <T> T extractClaim(String token, Function<Claims,T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Date extractExpiration (String token){
        return extractClaim(token,Claims::getExpiration);
    }

    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    public boolean validateToken(String token, UserDetails userDetails){
        final String username = getUserNameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public void addToBlackList(HttpServletRequest request){
        var token = extractTokenFromRequest(request);
        blackListRepository.save(JWTBlackListedTokens.builder().token(token)
                .expirationDate(extractExpiration(token)).build());
    }

    public List<JWTBlackListedTokens> getBlackList(){
        return blackListRepository.findAll();
    }

    public boolean checkIfTokenIsBlackListed(String token){
        return getBlackList().stream().map(JWTBlackListedTokens::getToken)
                .toList().contains(token);
    }
}
