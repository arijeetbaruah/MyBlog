#!/bin/bash
service nginx stop
service nginx start
service nginx status

touch /var/log/nginx/error.log
touch /var/log/nginx/access.log
touch /var/log/nginx/nebm.webonise.com.error.log
touch /var/log/nginx/nebm.webonise.com.access.log


tail -f /var/log/nginx/error.log \
tail -f /var/log/nginx/access.log \
        /var/log/nginx/nebm.webonise.com.error.log \
        /var/log/nginx/nebm.webonise.com.access.log \

