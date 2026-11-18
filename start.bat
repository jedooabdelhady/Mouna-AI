@echo off
title Mouna AI - local site
cd /d "%~dp0"
echo Mouna AI is running at http://localhost:8797/
echo Keep this window open while you use the site. Close it or press Ctrl+C to stop.
echo.
where py >nul 2>nul && (call :open & py -m http.server 8797 & goto :end)
where python >nul 2>nul && (call :open & python -m http.server 8797 & goto :end)
where npx >nul 2>nul && (call :open & npx --yes serve -l 8797 . & goto :end)
echo Could not find Python or Node.js on this computer.
echo Install Python from python.org and run this file again, or open index.html in your browser.
:end
pause
goto :eof

:open
start "" /b cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:8797/"
goto :eof
