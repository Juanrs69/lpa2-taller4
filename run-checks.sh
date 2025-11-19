#!/bin/bash
set -e

echo "🚀 Ejecutando verificaciones de calidad de código..."

echo "📁 Navegando al directorio frontend..."
cd frontend

echo "🔍 Verificando tipos TypeScript..."
pnpm run type-check

echo "🎨 Ejecutando Prettier..."
pnpm run format:check

echo "✅ Construyendo el proyecto..."
pnpm run build

echo "🎉 ¡Todas las verificaciones pasaron exitosamente!"
echo "📦 El proyecto está listo para deployment"
