@ECHO OFF

git pull & docker-compose up -d && start /d . .\scripts\server.cmd & start /d . .\scripts\openWeb.cmd

exit
