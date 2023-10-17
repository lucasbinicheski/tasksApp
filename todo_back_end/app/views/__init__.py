from flask_restx import Api

from app.views.auth import auth_namespace
from app.views.task import task_namespace
from app.views.user import user_namespace

authorizations = {'oauth2': {
        'type': 'oauth2',
        'flow': 'password',
        'tokenUrl': '/auth/login',
    }}
api = Api(version='1.0', title='Todo API', doc='/doc', authorizations=authorizations)

api.add_namespace(auth_namespace, path="/auth")
api.add_namespace(task_namespace, path='/task')
api.add_namespace(user_namespace, path='/user')
