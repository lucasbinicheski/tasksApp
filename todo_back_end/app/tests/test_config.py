import os


def test_development_config(test_app):
    test_app.config.from_object('app.config.DevelopmentConfig')
    assert test_app.config['JWT_SECRET_KEY'] == 'my_precious'
    assert not test_app.config['TESTING']
    assert test_app.config['SQLALCHEMY_DATABASE_URI'] == os.environ.get('DATABASE_URL')


def test_testing_config(test_app):
    test_app.config.from_object('app.config.TestingConfig')
    assert test_app.config['JWT_SECRET_KEY'] == 'my_precious'
    assert test_app.config['TESTING']
    assert test_app.config['SQLALCHEMY_DATABASE_URI'] == os.environ.get('DATABASE_TEST_URL')
