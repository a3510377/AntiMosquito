@ECHO OFF

if %ERRORLEVEL% neq 0 goto start


:start
git pull & cd .\code\rearEndv2 & npm install & npm run start

goto start
