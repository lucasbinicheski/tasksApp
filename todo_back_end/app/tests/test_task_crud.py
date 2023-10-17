import json
from app.models import Task


def test_task_post(test_app, test_database):
    client = test_app.test_client()
    resp = client.post(
        '/task',
        data=json.dumps({'title': 'testing', 'description': 'testing'}),
        content_type='application/json'
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 201
    assert resp.content_type == 'application/json'
    assert data['title'] == 'testing'
    assert data['description'] == 'testing'


def test_task_get(test_app, test_database, truncate_task, add_task):
    # Given
    task = add_task('testing', 'testing')
    task_second = add_task('testing 2', 'testing 2')
    client = test_app.test_client()

    # # Expected
    task_expected = task
    task_second_expected = task_second

    # When
    resp = client.get('/task')
    data = json.loads(resp.data.decode())

    # Then
    assert resp.status_code == 200
    assert resp.content_type == 'application/json'
    assert len(data) == 2
    assert data[0]['id'] == task_expected.id
    assert data[1]['id'] == task_second_expected.id


def test_task_patch_task_doesnt_exit(test_app, test_database, add_task):
    client = test_app.test_client()
    resp = client.patch(
        f'/task/999',
        data=json.dumps({'title': 'testing patched', 'description': 'testing patched'}),
        content_type='application/json'
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 404
    assert resp.content_type == 'application/json'
    assert data['message'] == 'Task not found.'


def test_task_patch_invalid_request_body(test_app, test_database, add_task):
    client = test_app.test_client()
    resp = client.patch(
        f'/task/999',
        data=json.dumps({}),
        content_type='application/json'
    )
    data = json.loads(resp.data.decode())
    assert resp.status_code == 400
    assert resp.content_type == 'application/json'
    assert data['message'] == 'Specify at least one field to update.'


def test_task_patch_main_data(test_app, test_database, add_task):
    # Given
    task = add_task('testing patch', 'testing patch')
    client = test_app.test_client()

    # # Expected
    task_title_before_patch = task.title
    task_description_before_patch = task.description
    task_done_before_patch = task.done

    # When
    resp = client.patch(
        f'/task/{task.id}',
        data=json.dumps({'title': 'testing patched', 'description': 'testing patched'}),
        content_type='application/json'
    )
    data = json.loads(resp.data.decode())

    # Then
    assert resp.status_code == 200
    assert resp.content_type == 'application/json'
    assert data['id'] == task.id
    assert data['done'] == task_done_before_patch
    assert data['title'] != task_title_before_patch
    assert data['description'] != task_description_before_patch
    assert data['title'] == 'testing patched'
    assert data['description'] == 'testing patched'


def test_task_patch_mask_as_done(test_app, test_database, add_task):
    # Given
    task = add_task('testing patch', 'testing patch')
    client = test_app.test_client()

    # # Expected
    task_title_before_patch = task.title
    task_description_before_patch = task.description
    task_done_before_patch = task.done

    # When
    resp = client.patch(
        f'/task/{task.id}',
        data=json.dumps({'done': True}),
        content_type='application/json'
    )
    data = json.loads(resp.data.decode())

    # Then
    assert resp.status_code == 200
    assert resp.content_type == 'application/json'
    assert data['id'] == task.id
    assert data['done'] != task_done_before_patch
    assert data['title'] == task_title_before_patch
    assert data['description'] == task_description_before_patch
    assert data['done'] == True


def test_task_delete(test_app, test_database, add_task):
    # Given
    task = add_task('testing delete', 'testing delete')
    client = test_app.test_client()

    # When
    resp = client.delete(f'/task/{task.id}',)

    # Then
    assert resp.status_code == 204
    assert resp.content_type == 'application/json'
    assert resp.data.decode() == ''
    assert Task.query.get(task.id) == None


def test_task_delete_task_doesnt_exist(test_app, test_database, add_task):
    # Given
    client = test_app.test_client()

    # When
    resp = client.delete(f'/task/999')
    data = json.loads(resp.data.decode())

    # Then
    assert resp.status_code == 404
    assert resp.content_type == 'application/json'
    assert data['message'] == 'Task not found.'
