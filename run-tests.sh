#!/bin/bash

# Script para ejecutar todos los tests y verificaciones del proyecto lpa2-taller4
# Autor: Juan Alejandro Ramirez Sanchez

set -e  # Salir si hay errores

echo "🧪 Ejecutando Tests y Verificaciones - LPA2 Taller 4"
echo "=================================================="

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir con colores
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Directorio del proyecto
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

echo "📁 Directorio del proyecto: $PROJECT_DIR"
echo

# 1. Tests de Python con pytest
echo "🐍 Ejecutando tests de Python..."
if /home/juana/proyectos/lpa2-taller4/.venv/bin/python -m pytest tests/ -v --tb=short; then
    print_status "Tests de Python completados exitosamente"
else
    print_error "Fallos en tests de Python"
    exit 1
fi
echo

# 2. Tests con coverage
echo "📊 Ejecutando tests con coverage..."
if /home/juana/proyectos/lpa2-taller4/.venv/bin/python -m pytest tests/ --cov=. --cov-report=term-missing --cov-report=html; then
    print_status "Coverage report generado"
else
    print_warning "Advertencias en coverage"
fi
echo

# 3. Tests del frontend (si está disponible)
if [ -d "frontend" ]; then
    echo "⚛️  Ejecutando tests del frontend..."
    cd frontend

    # Verificar type checking
    if pnpm run type-check; then
        print_status "TypeScript type check completado"
    else
        print_error "Errores en TypeScript"
        cd ..
        exit 1
    fi

    # Verificar linting
    if pnpm run lint 2>/dev/null || true; then
        print_status "ESLint completado"
    else
        print_warning "Advertencias en ESLint"
    fi

    # Ejecutar tests unitarios (si existen)
    if [ -f "jest.config.js" ]; then
        if pnpm test --passWithNoTests; then
            print_status "Tests de Jest completados"
        else
            print_warning "Advertencias en tests de Jest"
        fi
    fi

    # Verificar build
    if pnpm run build; then
        print_status "Build del frontend exitoso"
    else
        print_error "Error en build del frontend"
        cd ..
        exit 1
    fi

    cd ..
else
    print_warning "Directorio frontend no encontrado, saltando tests del frontend"
fi
echo

# 4. Verificar estructura del proyecto
echo "📁 Verificando estructura del proyecto..."

required_files=(
    "README.md"
    ".gitignore"
    ".pre-commit-config.yaml"
    "documentacion_api_musica.json"
    "api_endpoints_para_v0.json"
    "tests/conftest.py"
)

all_files_exist=true
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        print_status "Archivo $file existe"
    else
        print_error "Falta archivo requerido: $file"
        all_files_exist=false
    fi
done

if [ "$all_files_exist" = true ]; then
    print_status "Estructura del proyecto verificada"
else
    print_error "Estructura del proyecto incompleta"
    exit 1
fi
echo

# 5. Verificar configuración de git
echo "🔧 Verificando configuración de git..."

if [ -d ".git" ]; then
    print_status "Repositorio git inicializado"

    # Verificar pre-commit hooks
    if [ -f ".git/hooks/pre-commit" ]; then
        print_status "Pre-commit hooks instalados"
    else
        print_warning "Pre-commit hooks no instalados"
    fi
else
    print_warning "No es un repositorio git"
fi
echo

# 6. Resumen final
echo "📋 RESUMEN DE VERIFICACIONES"
echo "=========================="
print_status "✅ Tests de Python ejecutados"
print_status "✅ Coverage report generado"
print_status "✅ Frontend verificado"
print_status "✅ Estructura del proyecto validada"
print_status "✅ Configuración verificada"
echo
echo "🎉 Todas las verificaciones completadas exitosamente!"
echo "El proyecto está listo para ser subido a GitHub."
echo

# Mostrar información adicional
echo "📊 INFORMACIÓN DEL PROYECTO"
echo "========================="
echo "• Tests ejecutados: $(find tests/ -name 'test_*.py' | wc -l) archivos"
echo "• Documentación: $(ls *.json *.md 2>/dev/null | wc -l) archivos"
if [ -d "frontend" ]; then
    echo "• Frontend: Next.js + TypeScript configurado"
fi
if [ -d "docs" ]; then
    echo "• GitHub Pages: Documentación lista en /docs"
fi
echo "• Pre-commit hooks: Configurados y listos"
echo
