from flask import request
from flask_restx import Namespace, Resource, fields

from app.main import db
from app.models import User

user_namespace = Namespace("user")

user = user_namespace.model("User", {"id": fields.Integer(readonly=True), "username": fields.String(required=True)})
full_user = user_namespace.clone("FullUser", user, {"password": fields.String(required=True)})
username_already_registered = user_namespace.model('UsernameAlreadyRegisted', {'message': fields.String(required=True, example='Username already registered.')})


class Register(Resource):
    @user_namespace.marshal_with(user, code=201, description="Success")
    @user_namespace.response(409, "Conflict", username_already_registered)
    @user_namespace.expect(full_user, validate=True)
    def post(self):
        post_data = request.get_json()
        username = post_data.get("username")
        password = post_data.get("password")

        user = User.query.filter_by(username=username).first()
        if user:
            user_namespace.abort(409, "Username already registered.")

        user = User(username=username, password=password)
        db.session.add(user)
        db.session.commit()

        return user, 201


user_namespace.add_resource(Register, "/register")
