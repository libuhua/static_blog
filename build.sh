#/bin/bash
hexo clean
hexo generate
cd public
# cnpm install -g http-server
http-server