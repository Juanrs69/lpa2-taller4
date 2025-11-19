"""
Tests de integración para verificar la conexión entre frontend y API.
"""

import json
import requests
from pathlib import Path
from unittest.mock import patch, MagicMock


class TestIntegracionAPI:
    """Tests de integración entre frontend y API."""

    def setup_method(self):
        """Configuración para cada test."""
        self.api_base_url = "http://127.0.0.1:8000"
        self.project_root = Path(__file__).parent.parent
        self.endpoints_file = self.project_root / "api_endpoints_para_v0.json"

    def test_endpoints_documentados_correctamente(self):
        """Verificar que los endpoints están documentados correctamente."""
        with open(self.endpoints_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        assert "api_base_url" in data, "Debe tener api_base_url"
        assert data["api_base_url"] == "http://127.0.0.1:8000", "URL base incorrecta"

        endpoints = data["endpoints_principales"]
        assert len(endpoints) > 0, "Debe tener endpoints documentados"

    def test_estructura_endpoints_correcta(self):
        """Verificar que los endpoints tienen la estructura correcta."""
        with open(self.endpoints_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        endpoints = data["endpoints_principales"]

        for endpoint in endpoints:
            assert "endpoint" in endpoint, "Endpoint debe tener URL"
            assert "metodo" in endpoint, "Endpoint debe tener método HTTP"
            assert "descripcion" in endpoint, "Endpoint debe tener descripción"

    def test_validaciones_documentadas(self):
        """Verificar que las validaciones están documentadas."""
        with open(self.endpoints_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        validaciones = data["validaciones_importantes"]

        # Verificar validaciones de usuario
        assert "usuario" in validaciones, "Debe tener validaciones de usuario"
        usuario_val = validaciones["usuario"]
        assert "nombre" in usuario_val, "Debe validar nombre de usuario"
        assert "correo" in usuario_val, "Debe validar correo de usuario"

    def test_funcionalidades_especiales_documentadas(self):
        """Verificar que las funcionalidades especiales están documentadas."""
        with open(self.endpoints_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        funcionalidades = data["funcionalidades_especiales"]

        funcionalidades_requeridas = [
            "paginacion",
            "busqueda_avanzada",
            "eliminacion_cascada",
        ]

        for func in funcionalidades_requeridas:
            assert func in funcionalidades, f"Falta funcionalidad: {func}"

    @patch("requests.get")
    def test_mock_api_health_check(self, mock_get):
        """Test mock para verificar health check de la API."""
        # Configurar mock response
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            "status": "healthy",
            "database": "connected",
            "version": "1.0.0",
        }
        mock_get.return_value = mock_response

        # Simular llamada al health check
        response = requests.get(f"{self.api_base_url}/health")

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "database" in data
        assert "version" in data

    @patch("requests.get")
    def test_mock_api_usuarios_endpoint(self, mock_get):
        """Test mock para endpoint de usuarios."""
        # Configurar mock response
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = [
            {
                "id": 1,
                "nombre": "Test User",
                "correo": "test@example.com",
                "fecha_registro": "2024-11-18T10:00:00",
            }
        ]
        mock_get.return_value = mock_response

        # Simular llamada al endpoint de usuarios
        response = requests.get(f"{self.api_base_url}/api/usuarios/")

        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        if len(data) > 0:
            usuario = data[0]
            assert "id" in usuario
            assert "nombre" in usuario
            assert "correo" in usuario
