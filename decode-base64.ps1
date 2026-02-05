# Script para decodificar arquivos Base64 e copiar para o projeto VEXO
# Como usar:
# 1. Coloque todos os seus arquivos .base64 em uma pasta (ex: C:\Temp\sistemas-base64)
# 2. Execute este script no PowerShell
# 3. Os arquivos serão decodificados e copiados para src/modules/

param(
    [string]$SourceFolder = "C:\Temp\sistemas-base64",
    [string]$DestinationFolder = ".\src\modules"
)

Write-Host "🚀 Iniciando decodificação de sistemas Base64..." -ForegroundColor Cyan

# Criar pasta de destino se não existir
if (!(Test-Path $DestinationFolder)) {
    New-Item -ItemType Directory -Path $DestinationFolder -Force | Out-Null
    Write-Host "✅ Pasta criada: $DestinationFolder" -ForegroundColor Green
}

# Processar cada arquivo .base64
$files = Get-ChildItem -Path $SourceFolder -Filter "*.base64" -ErrorAction SilentlyContinue

if ($files.Count -eq 0) {
    Write-Host "❌ Nenhum arquivo .base64 encontrado em: $SourceFolder" -ForegroundColor Red
    Write-Host "💡 Certifique-se de que os arquivos têm extensão .base64" -ForegroundColor Yellow
    exit
}

Write-Host "📁 Encontrados $($files.Count) arquivos para decodificar" -ForegroundColor Cyan

foreach ($file in $files) {
    try {
        Write-Host "`n🔄 Processando: $($file.Name)" -ForegroundColor Yellow
        
        # Ler conteúdo Base64
        $base64Content = Get-Content $file.FullName -Raw
        
        # Decodificar
        $bytes = [System.Convert]::FromBase64String($base64Content)
        
        # Nome do arquivo de saída (remove .base64)
        $outputName = $file.BaseName
        $outputPath = Join-Path $DestinationFolder $outputName
        
        # Salvar arquivo decodificado
        [System.IO.File]::WriteAllBytes($outputPath, $bytes)
        
        Write-Host "   ✅ Decodificado: $outputName" -ForegroundColor Green
        Write-Host "   📍 Salvo em: $outputPath" -ForegroundColor Gray
        
    } catch {
        Write-Host "   ❌ Erro ao processar $($file.Name): $_" -ForegroundColor Red
    }
}

Write-Host "`n🎉 Processo concluído!" -ForegroundColor Cyan
Write-Host "📂 Arquivos salvos em: $DestinationFolder" -ForegroundColor Green
