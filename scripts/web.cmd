@ECHO OFF

if %ERRORLEVEL% neq 0 goto start


::start
git pull & cd .\code\web & npm install & npm run dev

goto start