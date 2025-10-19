"""
Generate OpenAPI specifications per module.
This script creates separate YAML files for each module's API endpoints.
"""

import json
import yaml
from pathlib import Path
from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi

# Import modules
from app.config import get_settings
from app.modules.authentication.adapters.inbound.http.routes import authentication_routes
from app.modules.authentication import di as auth_di


def generate_module_spec(module_name: str, router, output_dir: Path):
    """Generate OpenAPI spec for a single module."""
    
    # Create a temporary FastAPI app for this module only
    temp_app = FastAPI(
        title=f"{module_name.capitalize()} API",
        version="1.0.0",
        description=f"API endpoints for {module_name} module"
    )
    
    # Configure DI if needed (for authentication module)
    if module_name == "authentication":
        auth_di.configure(temp_app)
    
    # Include the router
    temp_app.include_router(router, prefix=f"/api/v1/{module_name}")
    
    # Generate OpenAPI schema
    openapi_schema = get_openapi(
        title=temp_app.title,
        version=temp_app.version,
        description=temp_app.description,
        routes=temp_app.routes,
    )
    
    # Add security schemes for authentication module
    if module_name == "authentication":
        openapi_schema["components"] = openapi_schema.get("components", {})
        openapi_schema["components"]["securitySchemes"] = {
            "OAuth2PasswordBearer": {
                "type": "oauth2",
                "flows": {
                    "password": {
                        "tokenUrl": "/api/v1/auth/login",
                        "scopes": {}
                    }
                }
            },
            "CookieAuth": {
                "type": "apiKey",
                "in": "cookie",
                "name": "solveos_token"
            }
        }
    
    # Create output directory if it doesn't exist
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Write JSON
    json_path = output_dir / f"{module_name}.json"
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(openapi_schema, f, indent=2)
    
    # Write YAML
    yaml_path = output_dir / f"{module_name}.yaml"
    with open(yaml_path, 'w', encoding='utf-8') as f:
        yaml.dump(openapi_schema, f, default_flow_style=False, sort_keys=False, allow_unicode=True)
    
    print(f"✅ Generated {module_name} specs:")
    print(f"   - {json_path}")
    print(f"   - {yaml_path}")
    
    return openapi_schema


def main():
    """Generate specs for all modules."""
    settings = get_settings()
    output_dir = Path(__file__).parent / "openapi-specs"
    
    print(f"Generating module-specific OpenAPI specifications...")
    print(f"Output directory: {output_dir}\n")
    
    # Authentication module
    generate_module_spec(
        module_name="auth",
        router=authentication_routes.router,
        output_dir=output_dir
    )
    
    # Add more modules here as they are created
    # generate_module_spec("orders", orders_router, output_dir)
    # generate_module_spec("customers", customers_router, output_dir)
    
    print(f"\n✨ All module specs generated successfully!")
    print(f"📁 Find them in: {output_dir}")


if __name__ == "__main__":
    main()
