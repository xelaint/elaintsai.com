#!/bin/bash

cd /var/www/vhosts/elaintsai.com && \ 
rm -rf public_html && \
mkdir public_html && \
tar zxvf package.tgz -C public_html && \
rm package.tgz