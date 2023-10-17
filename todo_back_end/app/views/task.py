from flask import request
from flask_jwt_extended import jwt_required
from flask_restx import Namespace, Resource, fields

from app.main import db
from app.models import Task as TaskEntity
from app.views.auth import jwt_token_err

task_namespace = Namespace("task")

tasks_model = task_namespace.model(
    'Tasks',
    {
        'id': fields.Integer(readonly=True,),
        'title': fields.String(required=True,),
        'description': fields.String(required=True),
        'done': fields.Boolean(readonly=True, example=False),
    }
)


class Tasks(Resource):
    @task_namespace.marshal_with(tasks_model, as_list=True)
    @task_namespace.doc(description='List all tasks.')
    def get(self):
        tasks = TaskEntity.query.all()
        tasks.reverse()
        return tasks

    @jwt_required()
    @task_namespace.response(401, 'Auth error.', jwt_token_err)
    @task_namespace.expect(tasks_model)
    @task_namespace.marshal_with(tasks_model, code=201)
    @task_namespace.doc(security='oauth2', description='Creates a task.')
    def post(self):
        data = request.json
        title = data['title']
        description = data['description']
        task = TaskEntity(title=title, description=description)
        db.session.add(task)
        db.session.commit()
        return task, 201


task_model = task_namespace.model(
    'Task',
    {
        'id': fields.Integer(readonly=True,),
        'title': fields.String(),
        'description': fields.String(),
        'done': fields.Boolean(),
    }
)

task_not_found = task_namespace.model('TaskNotFound.', {'message': fields.String(required=True, example='Task not found.')})
specify_at_least_one_field = task_namespace.model('SpecifyAtLeastOneField', {'message': fields.String(required=True, example='Specify at least one field to update.')})


class Task(Resource):
    @jwt_required()
    @task_namespace.expect(task_model)
    @task_namespace.response(401, 'Auth error.', jwt_token_err)
    @task_namespace.response(404, 'Not found', task_not_found)
    @task_namespace.response(400, 'Bad Request.', specify_at_least_one_field)
    @task_namespace.marshal_with(task_model)
    @task_namespace.doc(security='oauth2', description='Edits a task e.g mark it as done.')
    def patch(self, id):
        data = request.json
        if not data:
            task_namespace.abort(400, 'Specify at least one field to update.')

        task = TaskEntity.query.get(id)
        if not task:
            task_namespace.abort(404, "Task not found.")

        if data.get('title'):
            task.title = data['title']
        if data.get('description'):
            task.description = data['description']
        if data.get('done') is not None:
            task.done = data['done']

        db.session.commit()

        return task

    @jwt_required()
    @task_namespace.response(401, 'Auth error.', jwt_token_err)
    @task_namespace.response(204, 'Task has been deleted.', None)
    @task_namespace.response(404, 'Not found.', task_not_found)
    @task_namespace.doc(security='oauth2', description='Deletes a task.')
    def delete(self, id):
        task = TaskEntity.query.get(id)
        if not task:
            task_namespace.abort(404, "Task not found.")
        db.session.delete(task)
        db.session.commit()
        return None, 204


task_namespace.add_resource(Tasks, '')
task_namespace.add_resource(Task, "/<int:id>")
