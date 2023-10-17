import os
import pytest
from sqlalchemy import text
from app.models import User, Task
from app.main import create_app, db


@pytest.fixture(autouse=True)
def neuter_jwt(monkeypatch):
  def no_verify(*args):
    pass

  from flask_jwt_extended import view_decorators

  monkeypatch.setattr(view_decorators, 'verify_jwt_in_request', no_verify)


@pytest.fixture(scope='module')
def test_app():
    os.environ['APP_SETTINGS'] = 'app.config.TestingConfig'
    app = create_app()
    with app.app_context():
        yield app


@pytest.fixture(scope='module')
def test_database(test_app):
    db.create_all()
    yield db
    db.session.remove()
    db.drop_all()


@pytest.fixture(scope="module")
def add_user(test_database):
    db = test_database
    def _add_user(username, password):
        user = User(username=username, password=password)
        db.session.add(user)
        db.session.commit()
        return user

    return _add_user


@pytest.fixture(scope='function')
def add_task(test_database):
    db = test_database
    def _add_task(title, description):
        task = Task(title=title, description=description)
        db.session.add(task)
        db.session.commit()
        return task

    return _add_task


@pytest.fixture(scope='function')
def truncate_task(test_database):
    db = test_database
    db.session.execute(text('TRUNCATE TABLE task'))
    yield
