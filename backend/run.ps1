$mavenDir = "apache-maven-3.9.6"
if (-Not (Test-Path $mavenDir)) {
    Write-Host "Downloading Maven locally for this project..."
    Invoke-WebRequest -Uri "https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip" -OutFile "maven.zip"
    Write-Host "Extracting Maven..."
    Expand-Archive -Path "maven.zip" -DestinationPath "." -Force
    Remove-Item "maven.zip"
}
Write-Host "Starting Spring Boot Application..."
$mvnPath = Join-Path $PWD "$mavenDir\bin\mvn.cmd"
& $mvnPath spring-boot:run
