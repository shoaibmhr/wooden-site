from pydantic_settings import BaseSettings, SettingsConfigDict
from decimal import Decimal


class Settings(BaseSettings):
    PROJECT_NAME: str = "Ashtech Wooden API"
    API_V1_PREFIX: str = "/api/v1"
    

    DATABASE_URL: str

    JWT_SECRET_KEY: str
    ADMIN_BOOTSTRAP_SECRET: str | None = None
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    DELIVERY_CHARGE: Decimal = Decimal("500.00")
    FREE_DELIVERY_MINIMUM: Decimal = Decimal("50000.00")
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )


settings = Settings()