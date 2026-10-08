$ErrorActionPreference = 'Stop'

if (-not (Get-Command flutter -ErrorAction SilentlyContinue)) {
  throw 'Flutter SDK was not found. Install Flutter and run this script again.'
}

Set-Location $PSScriptRoot

# Generate the standard Android/iOS Flutter platform projects around this source.
flutter create --platforms=android,ios --org com.torbaga --project-name torbaga_prof .

# Native bridge files are supplied separately because this package was prepared on a
# machine without Flutter/Xcode and therefore cannot safely generate/sign the platform shells.
Write-Host ''
Write-Host 'Flutter platform projects were generated.'
Write-Host 'Now apply the files under native_templates/ as described in mobile/SETUP.md.'
