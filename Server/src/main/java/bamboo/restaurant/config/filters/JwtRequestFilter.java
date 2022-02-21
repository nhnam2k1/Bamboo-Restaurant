package bamboo.restaurant.config.filters;

import bamboo.restaurant.config.securityConfig.JwtTokenUtil;
import bamboo.restaurant.services.JWTUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    @Autowired
    private JWTUserDetailsService jwtUserDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authorizeHeader = request.getHeader("Authorization");

        String username = null;
        String jwtToken = null;

        if (authorizeHeader != null && authorizeHeader.startsWith("Bearer "))
        {
            jwtToken = authorizeHeader.substring(7);
            try {
                username = jwtTokenUtil.getUsernameFromToken(jwtToken);
            }
            catch (IllegalArgumentException e) {
                System.out.println("Unable to get JWT Token");
            }
            catch (ExpiredJwtException e) {
                System.out.println("JWT Token has expired");
            }
        }
        else{
            System.out.println("JWT token does not begin with Bearer or without Authorization header");
        }

        if (username != null && SecurityContextHolder
                                .getContext()
                                .getAuthentication() == null) {

            UserDetails userDetails = jwtUserDetailsService
                                    .loadUserByUsername(username);

            if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities());

                WebAuthenticationDetails webAuthenticationDetails =
                        new WebAuthenticationDetailsSource()
                        .buildDetails(request);

                usernamePasswordAuthenticationToken
                        .setDetails(webAuthenticationDetails);

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
