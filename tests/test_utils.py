"""
Tests unitarios para utilidades y helpers del proyecto.
"""

import json
from pathlib import Path


class TestUtilidades:
    """Tests para funciones utilitarias."""

    def test_validar_estructura_json(self):
        """Test para validar que los JSONs tienen estructura correcta."""
        project_root = Path(__file__).parent.parent

        # Validar documentacion_api_musica.json
        docs_file = project_root / "documentacion_api_musica.json"
        if docs_file.exists():
            with open(docs_file, "r", encoding="utf-8") as f:
                data = json.load(f)
                assert isinstance(data, dict), "Debe ser un objeto JSON"

        # Validar api_endpoints_para_v0.json
        endpoints_file = project_root / "api_endpoints_para_v0.json"
        if endpoints_file.exists():
            with open(endpoints_file, "r", encoding="utf-8") as f:
                data = json.load(f)
                assert isinstance(data, dict), "Debe ser un objeto JSON"

    def test_formato_duracion(self):
        """Test para formateo de duración de canciones."""

        # Función utilitaria para formatear duración
        def format_duration(seconds):
            """Convierte segundos a formato MM:SS"""
            if seconds <= 0:
                return "0:00"
            minutes = seconds // 60
            secs = seconds % 60
            return f"{minutes}:{secs:02d}"

        # Tests
        assert format_duration(0) == "0:00"
        assert format_duration(60) == "1:00"
        assert format_duration(354) == "5:54"  # Bohemian Rhapsody
        assert format_duration(122) == "2:02"  # We Will Rock You
        assert format_duration(3600) == "60:00"  # 1 hora

    def test_validacion_email(self):
        """Test para validación de emails."""
        import re

        def validate_email(email):
            """Valida formato de email básico."""
            pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            return re.match(pattern, email) is not None

        # Tests de emails válidos
        assert validate_email("test@example.com") is True
        assert validate_email("user.name@domain.co") is True
        assert validate_email("user+tag@example.org") is True

        # Tests de emails inválidos
        assert validate_email("invalid-email") is False
        assert validate_email("@domain.com") is False
        assert validate_email("user@") is False
        assert validate_email("user@domain") is False

    def test_validacion_año(self):
        """Test para validación de año de canciones."""
        from datetime import datetime

        def validate_year(year):
            """Valida que el año esté en rango válido."""
            current_year = datetime.now().year
            return 1900 <= year <= current_year

        current_year = datetime.now().year

        # Tests válidos
        assert validate_year(1975) is True  # Queen
        assert validate_year(2000) is True
        assert validate_year(current_year) is True

        # Tests inválidos
        assert validate_year(1899) is False  # Muy antiguo
        assert validate_year(current_year + 1) is False  # Futuro
        assert validate_year(2050) is False  # Muy futuro

    def test_validacion_duracion(self):
        """Test para validación de duración de canciones."""

        def validate_duration(seconds):
            """Valida que la duración esté en rango válido (1-3600 segundos)."""
            return 1 <= seconds <= 3600

        # Tests válidos
        assert validate_duration(1) is True  # 1 segundo
        assert validate_duration(180) is True  # 3 minutos
        assert validate_duration(3600) is True  # 1 hora

        # Tests inválidos
        assert validate_duration(0) is False  # Muy corto
        assert validate_duration(3601) is False  # Muy largo
        assert validate_duration(-1) is False  # Negativo


class TestEstructuraProyecto:
    """Tests para validar la estructura del proyecto."""

    def test_archivos_principales_existen(self):
        """Verificar que los archivos principales del proyecto existen."""
        project_root = Path(__file__).parent.parent

        archivos_requeridos = [
            "README.md",
            ".gitignore",
            ".pre-commit-config.yaml",
            "documentacion_api_musica.json",
            "api_endpoints_para_v0.json",
        ]

        for archivo in archivos_requeridos:
            file_path = project_root / archivo
            assert file_path.exists(), f"Falta archivo requerido: {archivo}"

    def test_directorio_frontend_completo(self):
        """Verificar que el directorio frontend está completo."""
        project_root = Path(__file__).parent.parent
        frontend_dir = project_root / "frontend"

        assert frontend_dir.exists(), "Debe existir directorio frontend"

        # Verificar archivos clave del frontend
        archivos_frontend = ["package.json", "tsconfig.json", "next.config.mjs"]

        for archivo in archivos_frontend:
            file_path = frontend_dir / archivo
            assert file_path.exists(), f"Falta archivo en frontend: {archivo}"

    def test_directorio_tests_completo(self):
        """Verificar que el directorio de tests está completo."""
        project_root = Path(__file__).parent.parent
        tests_dir = project_root / "tests"

        assert tests_dir.exists(), "Debe existir directorio tests"

        # Verificar archivos de tests
        archivos_tests = [
            "conftest.py",
            "test_documentacion.py",
            "test_frontend_config.py",
            "test_integracion.py",
        ]

        for archivo in archivos_tests:
            file_path = tests_dir / archivo
            assert file_path.exists(), f"Falta archivo de test: {archivo}"
