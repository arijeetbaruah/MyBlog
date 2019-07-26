#!/bin/bash
service php-fpm stop
service php-fpm start
service php-fpm status
tail -f /app/logs/develop.log

