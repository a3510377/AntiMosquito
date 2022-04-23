@ECHO OFF

git pull & docker-compose up -d --build && start /d . .\scripts\server.cmd & start /d . .\scripts\openWeb.cmd

exit
