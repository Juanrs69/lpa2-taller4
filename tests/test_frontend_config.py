"""
Tests para validar la configuración del frontend.
"""

import json
from pathlib import Path


class TestConfiguracionFrontend:
    """Tests para validar la configuración del frontend."""

    def setup_method(self):
        """Configuración para cada test."""
        self.project_root = Path(__file__).parent.parent
        self.frontend_dir = self.project_root / "frontend"
        self.package_json = self.frontend_dir / "package.json"
        self.api_client = self.frontend_dir / "lib" / "api-client.ts"

    def test_frontend_directory_exists(self):
        """Verificar que el directorio frontend existe."""
        assert self.frontend_dir.exists(), "El directorio frontend debe existir"
        assert self.frontend_dir.is_dir(), "frontend debe ser un directorio"

    def test_package_json_exists_and_valid(self):
        """Verificar que package.json existe y es válido."""
        assert self.package_json.exists(), "Debe existir package.json"

        with open(self.package_json, "r", encoding="utf-8") as f:
            package_data = json.load(f)

        # Verificar campos esenciales
        assert "name" in package_data, "package.json debe tener nombre"
        assert "dependencies" in package_data, "package.json debe tener dependencias"
        assert "scripts" in package_data, "package.json debe tener scripts"

    def test_dependencias_frontend_instaladas(self):
        """Verificar que las dependencias principales están listadas."""
        with open(self.package_json, "r", encoding="utf-8") as f:
            package_data = json.load(f)

        deps = package_data["dependencies"]
        dev_deps = package_data.get("devDependencies", {})

        # Dependencias de producción
        deps_produccion = ["next", "react", "react-dom", "axios"]
        for dep in deps_produccion:
            assert dep in deps, f"Falta dependencia: {dep}"

        # Dependencias de desarrollo
        deps_desarrollo = ["typescript"]
        for dep in deps_desarrollo:
            assert dep in dev_deps, f"Falta dependencia de desarrollo: {dep}"

    def test_scripts_necesarios_existen(self):
        """Verificar que los scripts necesarios están configurados."""
        with open(self.package_json, "r", encoding="utf-8") as f:
            package_data = json.load(f)

        scripts = package_data["scripts"]
        scripts_requeridos = ["dev", "build", "start", "lint", "test"]

        for script in scripts_requeridos:
            assert script in scripts, f"Falta script: {script}"

    def test_api_client_configurado_correctamente(self):
        """Verificar que el cliente API está configurado correctamente."""
        assert self.api_client.exists(), "Debe existir api-client.ts"

        with open(self.api_client, "r", encoding="utf-8") as f:
            content = f.read()

        # Verificar configuración de la URL base
        assert "127.0.0.1:8000" in content, "API client debe apuntar al puerto 8000"
        assert "application/json" in content, "Debe tener Content-Type correcto"

    def test_estructura_directorios_frontend(self):
        """Verificar que la estructura de directorios es correcta."""
        directorios_requeridos = [
            "app",
            "components",
            "lib",
            "hooks",
            "types",
            "styles",
        ]

        for directorio in directorios_requeridos:
            dir_path = self.frontend_dir / directorio
            assert dir_path.exists(), f"Debe existir el directorio: {directorio}"
