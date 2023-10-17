from app.models import User


def test_passwords_are_random(test_app, test_database, add_user):
    user_one = add_user('justatest', 'greaterthaneight')
    user_two = add_user('justatest2', 'greaterthaneight')
    assert user_one.password != user_two.password


def test_encode_token(test_app, test_database, add_user):
    user = add_user('justatest', 'test')
    token = user.encode_token(user.id)
    assert isinstance(token, str)


def test_decode_token(test_app, test_database, add_user):
    user = add_user('justatest', 'test')
    token = user.encode_token(user.id)
    assert isinstance(token, str)
    assert User.decode_token(token) == user.id
