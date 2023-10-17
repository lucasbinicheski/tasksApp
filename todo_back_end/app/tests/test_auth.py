import json


def test_registered_user_login(test_app, test_database, add_user):
    add_user("test3", "test")
    client = test_app.test_client()
    resp = client.post(
        "/auth/login",
        data={
            "username": "test3",
            "password": "test"
        },
        content_type="application/x-www-form-urlencoded",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 200
    assert resp.content_type == "application/json"
    assert data["access_token"]


def test_registered_user_login_wrong_password(test_app, test_database, add_user):
    add_user("testing", "123456")
    client = test_app.test_client()
    resp = client.post(
        "/auth/login",
        data={
            "username": "testing",
            "password": "1234567"
        },
        content_type="application/x-www-form-urlencoded",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 401
    assert resp.content_type == "application/json"
    assert "Usuário ou senha inválidos." in data["message"]


def test_not_registered_user_login(test_app, test_database):
    client = test_app.test_client()
    resp = client.post(
        "/auth/login",
        data={
            "username": "testnotreal",
            "password": "test"
        },
        content_type="application/x-www-form-urlencoded",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 401
    assert resp.content_type == "application/json"
    assert "Usuário ou senha inválidos." in data["message"]
