import os

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy

from app.auth import create_auth_custom_exceptions

db = SQLAlchemy()
cors = CORS()
bcrypt = Bcrypt()


def create_app(script_info=None):
    app = Flask(__name__)
    app_settings = os.getenv('APP_SETTINGS')
    app.config.from_object(app_settings)
    app.config['ERROR_404_HELP'] = False

    jwt = JWTManager(app)
    create_auth_custom_exceptions(jwt)

    db.init_app(app)
    cors.init_app(app)
    bcrypt.init_app(app)

    from app.views import api
    api.init_app(app)

    @app.shell_context_processor
    def ctx():
        return {'app': app, 'db': db}

    return app
