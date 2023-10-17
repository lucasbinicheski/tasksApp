import json


def test_user_registration(test_app, test_database):
    client = test_app.test_client()
    resp = client.post(
        "/user/register",
        data=json.dumps({
            "username": "johndoe",
            "password": "123456",
        }),
        content_type="application/json",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 201
    assert resp.content_type == "application/json"
    assert "johndoe" in data["username"]
    assert "password" not in data


def test_user_already_registered(test_app, test_database, add_user):
    add_user("neo", "123456")
    client = test_app.test_client()
    resp = client.post(
        "/user/register",
        data=json.dumps({
            "username": "neo",
            "password": "123456",
        }),
        content_type="application/json",
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 409
    assert resp.content_type == "application/json"
    assert "Username already registered." in data["message"]
