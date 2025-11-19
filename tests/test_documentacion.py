"""
Tests para validar la documentación y configuración de la API.
"""

import json
from pathlib import Path


class TestDocumentacionAPI:
    """Tests para validar la documentación de la API."""

    def setup_method(self):
        """Configuración para cada test."""
        self.project_root = Path(__file__).parent.parent
        self.docs_file = self.project_root / "documentacion_api_musica.json"
        self.endpoints_file = self.project_root / "api_endpoints_para_v0.json"

    def test_documentacion_existe(self):
        """Verificar que existe el archivo de documentación."""
        assert self.docs_file.exists(), "Falta el archivo documentacion_api_musica.json"
        assert (
            self.endpoints_file.exists()
        ), "Falta el archivo api_endpoints_para_v0.json"

    def test_documentacion_es_json_valido(self):
        """Verificar que la documentación es JSON válido."""
        with open(self.docs_file, "r", encoding="utf-8") as f:
            data = json.load(f)
            assert isinstance(data, dict), "La documentación debe ser un objeto JSON"

    def test_documentacion_tiene_campos_requeridos(self):
        """Verificar que la documentación tiene los campos necesarios."""
        with open(self.docs_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        # Campos requeridos en la documentación
        campos_requeridos = [
            "informacion_general",
            "estructura_entidades",
            "endpoints",
            "codigos_error_comunes",
        ]

        for campo in campos_requeridos:
            assert campo in data, f"Falta el campo requerido: {campo}"

    def test_informacion_general_completa(self):
        """Verificar que la información general está completa."""
        with open(self.docs_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        info_general = data["informacion_general"]
        campos_info = ["nombre", "version", "descripcion", "puerto", "host", "base_url"]

        for campo in campos_info:
            assert (
                campo in info_general
            ), f"Falta el campo en informacion_general: {campo}"

        # Verificar valores específicos
        assert info_general["puerto"] == 8000, "El puerto debe ser 8000"
        assert info_general["host"] == "127.0.0.1", "El host debe ser 127.0.0.1"

    def test_estructura_entidades_completa(self):
        """Verificar que las entidades están bien definidas."""
        with open(self.docs_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        entidades = data["estructura_entidades"]
        entidades_requeridas = ["Usuario", "Cancion", "Favorito"]

        for entidad in entidades_requeridas:
            assert entidad in entidades, f"Falta la entidad: {entidad}"

        # Verificar campos de Usuario
        usuario = entidades["Usuario"]
        campos_usuario = ["id", "nombre", "correo", "fecha_registro"]
        for campo in campos_usuario:
            assert campo in usuario, f"Falta campo en Usuario: {campo}"

    def test_endpoints_tienen_estructura_correcta(self):
        """Verificar que los endpoints tienen la estructura correcta."""
        with open(self.docs_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        endpoints = data["endpoints"]
        assert len(endpoints) >= 20, "Debe haber al menos 20 endpoints documentados"

        # Verificar estructura del primer endpoint
        endpoint = endpoints[0]
        campos_endpoint = ["endpoint", "metodo", "descripcion"]

        for campo in campos_endpoint:
            assert campo in endpoint, f"Falta campo en endpoint: {campo}"

    def test_codigos_error_definidos(self):
        """Verificar que los códigos de error están definidos."""
        with open(self.docs_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        codigos_error = data["codigos_error_comunes"]
        codigos_requeridos = ["200", "201", "400", "404", "422", "500"]

        for codigo in codigos_requeridos:
            assert codigo in codigos_error, f"Falta código de error: {codigo}"
