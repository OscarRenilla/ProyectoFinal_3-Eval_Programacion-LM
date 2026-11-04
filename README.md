# 🚗 Concesionario — Full-Stack Spring Boot & PostgreSQL

<div align="center">
  <img src="https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java 21"/>
  <img src="https://img.shields.io/badge/Spring_Boot-4.0-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot"/>
  <img src="https://img.shields.io/badge/Spring_Data_JPA-Hibernate-6DB33F?style=for-the-badge&logo=hibernate&logoColor=white" alt="Spring Data JPA"/>
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
</div>

<p align="center">
  Aplicación full-stack de gestión integral para un concesionario de vehículos. Cuenta con una arquitectura en capas desacoplada: backend RESTful en <b>Spring Boot</b> con persistencia relacional en <b>PostgreSQL</b> mediante <b>Spring Data JPA</b> y un cliente frontend web interactivo.
</p>

<p align="center">
  🔗 <b>Demo en vivo:</b> <a href="https://concesionario-two.vercel.app/" target="_blank">https://concesionario-two.vercel.app/</a>
</p>

---

## 🌟 Funcionalidades

- 🚘 **Catálogo y Gestión de Vehículos:** Visualización dinámica de coches, especificaciones técnicas, precios e imágenes.
- 🔄 **Operaciones CRUD Completas:** Creación, lectura, actualización y eliminación de vehículos mediante endpoints REST.
- 🗄️ **Persistencia Relacional Robusta:** Mapeo objeto-relacional con Hibernate/JPA sobre base de datos PostgreSQL (`galeria_db`).
- 🎨 **Frontend Dinámico y Responsive:** Interfaz de usuario con filtrado, diseño adaptable a dispositivos móviles y consumo asíncrono con `fetch`.
- 🩺 **Monitorización de Salud:** Endpoints de monitorización de métricas de la API con Spring Boot Actuator.

---

## 🏗️ Estructura del Proyecto

```
ProyectoFinal_3-Eval_Programacion-LM/
├── frontend/                     # Cliente Web (HTML5, CSS3, JavaScript ES6)
│   ├── css/                      # Hojas de estilo y diseño responsive
│   ├── js/                       # Peticiones asíncronas a la API REST
│   └── index.html                # Catálogo interactivo del concesionario
├── src/main/java/com/miGaleria/  # Backend Spring Boot
│   ├── controller/               # Controladores REST (@RestController)
│   ├── model/                    # Entidades JPA (@Entity)
│   ├── repository/               # Repositorios Spring Data JPA (JpaRepository)
│   └── service/                  # Capa de servicios y lógica de negocio
├── src/main/resources/
│   └── application.properties    # Configuración de datasource PostgreSQL
└── pom.xml                       # Maven POM (Java 21, Spring Boot, PostgreSQL)
```

---

## 🛠️ Stack Tecnológico

- **Backend:** Java 21, Spring Boot, Spring WebMVC, Spring Data JPA (Hibernate), Spring Boot Actuator
- **Base de Datos:** PostgreSQL
- **Frontend:** HTML5, CSS3, JavaScript (Fetch API, DOM manipulation)
- **Despliegue:** Vercel (Frontend)

---

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
- JDK 21 instalado
- Servidor PostgreSQL en ejecución
- Maven 3.9+ (o usar `./mvnw`)

### 1. Configurar la Base de Datos
Accede a tu cliente de PostgreSQL (pgAdmin, psql o Docker) y crea la base de datos:
```sql
CREATE DATABASE galeria_db;
```

> [!TIP]
> Si prefieres arrancar PostgreSQL con Docker:
> ```bash
> docker run -d --name concesionario-db -p 5432:5432 -e POSTGRES_DB=galeria_db -e POSTGRES_PASSWORD=secret postgres:alpine
> ```

### 2. Configurar el Backend
Ajusta las credenciales en `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/galeria_db
spring.datasource.username=postgres
spring.datasource.password=secret
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 3. Ejecutar la Aplicación
```bash
# Backend (Spring Boot)
./mvnw spring-boot:run

# Frontend
Abrir frontend/index.html en el navegador o iniciar un servidor local estático.
```

---

## 👨‍💻 Autor

- **Óscar Renilla**  
  GitHub: [@OscarRenilla](https://github.com/OscarRenilla)  
  Portfolio: [oscar-renilla-portfolio.vercel.app](https://oscar-renilla-portfolio.vercel.app/)  
  LinkedIn: [Óscar Renilla Rodríguez](https://www.linkedin.com/in/%C3%B3scar-renilla-rodr%C3%ADguez)

