# Update API URLs in Admin Files

$publicPath = "C:\Users\heman\Desktop\Crazy-Musics-Admin\public"

# Update dashboard.js
$dashboardJs = Join-Path $publicPath "scripts\dashboard.js"
if (Test-Path $dashboardJs) {
    $content = Get-Content $dashboardJs -Raw
    $content = $content -replace "const API_BASE_URL = window\.location\.hostname === 'localhost'.*\n.*\n.*\n.*'https://crazy-musics-1\.onrender\.com';", "const API_BASE_URL = window.location.origin;"
    $content = $content -replace "https://crazy-musics-1\.onrender\.com", ""
    $content = $content -replace "`${API_BASE_URL}/users", "`${API_BASE_URL}/api/users"
    $content = $content -replace "`${API_BASE_URL}/signup", "`${API_BASE_URL}/api/users"
    $content = $content -replace "`${API_BASE_URL}/admin/users", "`${API_BASE_URL}/api/users"
    $content = $content -replace "`${API_BASE_URL}/user/", "`${API_BASE_URL}/api/users/"
    Set-Content $dashboardJs $content
    Write-Host "Updated dashboard.js"
}

# Update login.html
$loginHtml = Join-Path $publicPath "login.html"
if (Test-Path $loginHtml) {
    $content = Get-Content $loginHtml -Raw
    $content = $content -replace "const API_BASE_URL = window\.location\.hostname === 'localhost'.*\n.*\n.*\n.*'https://crazy-musics-1\.onrender\.com';", "const API_BASE_URL = window.location.origin;"
    $content = $content -replace "`${API_BASE_URL}/admin/login", "`${API_BASE_URL}/api/admin/login"
    Set-Content $loginHtml $content
    Write-Host "Updated login.html"
}

# Update settings.js
$settingsJs = Join-Path $publicPath "scripts\settings.js"
if (Test-Path $settingsJs) {
    $content = Get-Content $settingsJs -Raw
    $content = $content -replace "const API_BASE_URL = window\.location\.hostname === 'localhost'.*\n.*\n.*\n.*'https://crazy-musics-1\.onrender\.com';", "const API_BASE_URL = window.location.origin;"
    Set-Content $settingsJs $content
    Write-Host "Updated settings.js"
}

Write-Host "All API URLs updated successfully!"
