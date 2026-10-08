@echo off
set /p msg=Commit message: 

if "%msg%"=="" (
    echo Commit message cannot be empty.
    pause
    exit /b 1
)

echo.
echo === Git Add ===
git add .

echo.
echo === Git Commit ===
git commit -m "%msg%"

if errorlevel 1 (
    echo.
    echo Commit failed. Push cancelled.
    pause
    exit /b 1
)

echo.
echo === Git Push ===
git push

echo.
echo === Done ===
pause
