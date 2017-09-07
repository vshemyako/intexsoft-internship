package by.intexsoft.application.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import by.intexsoft.application.service.implementations.StudentServiceImpl;

/**
 * Java-based configuration class for a dispatcher servlet context.
 * {@link @EnableWebMvc} configures a list of special bean types the
 * DispatcherServlet relies on
 */
@Configuration
@EnableWebMvc
@ComponentScan("by.intexsoft.application.controller")
public class DispatcherServletContextConfiguration {

	/**
	 * @return instance of a StudentServiceImpl class
	 */
	@Bean
	public StudentServiceImpl studentServiceImpl() {
		return new StudentServiceImpl();
	}
}
