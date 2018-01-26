#!/bin/bash
set -x

cd /var/www/vhosts/elaintsai.com && \ 
rm -rf public_html/*
tar zxvf package.tgz -C public_html && \
rm package.tgz