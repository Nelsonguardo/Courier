
# Courier Project

## Guía de Instalación con Docker

### Prerrequisitos
- Docker Desktop para Windows
- Docker Compose
- Git

### Estructura del Proyecto
```
Courier/
├── docker-compose.yml
├── Dockerfile
├── .env
├── sql/
│   └── init.sql
└── ...
```

### Pasos para la Instalación

1. **Clonar el Repositorio**
```bash
git clone https://github.com/Nelsonguardo/Courier.git
cd Courier
```

2. **Configurar Variables de Entorno**
- Crear/modificar el archivo `.env` con los siguientes valores:
```properties
# Environment Variables
DB_HOST=db #Cambiar por db al usar docker
REDIS_HOST=redis-14306.c74.us-east-1-4.ec2.redns.redis-cloud.com
REDIS_PORT=14306
REDIS_PASSWORD=AvLaBhQOPJPBINxmT1jR78NfAiJ72UFp
DB_USER=root
DB_PASSWORD=admin
DB_NAME_DEV=courierdev
DB_NAME_TEST=couriertest
DB_NAME_PROD=courier
DB_PORT=3306
PORT=3001
ENVIROMENT=development

#Ejemplo de uso de variables de entorno
#ENVIROMENT=development
#ENVIROMENT=production
#ENVIROMENT=test
```

3. **Construir e Iniciar los Contenedores**

Antes de ejecutar los comandos, asegurarse de tener docker inicializado 

```bash
docker-compose up --build
```
Para ejecutar en segundo plano:
```bash
docker-compose up -d
```

5. **Verificar la Instalación**
- Aplicación web: http://localhost:3001
- Documentación con Swaggers: http://localhost:3001/api-docs/ 
- Base de datos MySQL: localhost:3306

### Comandos Útiles de Docker

| Comando | Descripción |
|---------|-------------|
| `docker-compose ps` | Ver estado de los contenedores |
| `docker-compose logs` | Ver logs de los servicios |
| `docker-compose down` | Detener y eliminar contenedores |
| `docker-compose restart` | Reiniciar servicios |

### Solución de Problemas

1. **Error de Conexión a MySQL**
   - Verificar que DB_HOST sea 'db' en el archivo .env
   - Esperar ~30 segundos para que MySQL inicie completamente

2. **Error de Permisos**
   - Verificar las credenciales en .env
   - Asegurar que los valores de DB_USER y DB_PASSWORD coincidan

3. **Puerto en Uso**
   - Cambiar el puerto en .env si 3001 está ocupado
   - Verificar que no haya otros servicios usando el puerto 3306
