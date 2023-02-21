# Usar la imagen base de Python 3.9
FROM python:3.9-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los requisitos y actualizar y instalar paquetes necesarios
COPY requirements.txt .
RUN apk update && \
    apk add build-base && \
    pip install -r requirements.txt

RUN apk update && apk add nginx

# Instalar gunicorn
RUN pip install gunicorn
# Copiar todos los archivos y carpetas del proyecto
COPY . .
COPY nginx.conf /etc/nginx/nginx.conf


# Ejecutar comandos
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
