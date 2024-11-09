# Menggunakan image base PHP dengan Apache
FROM php:8.2-apache

# Menyalin kode proyek Laravel ke dalam direktori /var/www/html di dalam container
COPY . /var/www/html

# Mengatur lingkungan Laravel
WORKDIR /var/www/html

# Expose port 80 untuk Apache
EXPOSE 80

# Menjalankan Apache
CMD ["apache2-foreground"]
