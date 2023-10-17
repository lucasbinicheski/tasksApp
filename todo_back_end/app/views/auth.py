from flask import request
from flask_restx import Namespace, Resource, fields

from app.main import bcrypt
from app.models import User

auth_namespace = Namespace("auth")

token = auth_namespace.clone(
    "AccessToken", {"access_token": fields.String(required=True)}
)
invalid_user_or_password = auth_namespace.model('InvalidUsernameOrPassword', {'message': fields.String(required=True, example='Usuário ou senha inválidos.')})
oauth2_parser = auth_namespace.parser()
oauth2_parser.add_argument('username', type=str, required=True, location="form")
oauth2_parser.add_argument('password', type=str, required=True, location="form")

jwt_token_err = auth_namespace.model("AuthError", {"message": fields.String(required=True), "error": fields.String(required=True)})


class Login(Resource):
    @auth_namespace.marshal_with(token, description="Success")
    @auth_namespace.response(401, "Unauthorized.", invalid_user_or_password)
    @auth_namespace.expect(oauth2_parser, validate=True)
    def post(self):
        post_data = request.form.to_dict()
        username = post_data.get("username")
        password = post_data.get("password")

        user = User.query.filter_by(username=username).first()
        if not user or not bcrypt.check_password_hash(user.password, password):
            auth_namespace.abort(401, "Usuário ou senha inválidos.")

        access_token = user.encode_token(user.id)

        response_object = {
            "access_token": access_token,
        }
        return response_object, 200

auth_namespace.add_resource(Login, "/login")
