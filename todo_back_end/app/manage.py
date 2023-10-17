import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from app.main import create_app, db

from flask.cli import FlaskGroup


app = create_app()
cli = FlaskGroup(create_app=create_app)


@cli.command('recreate_db')
def recreate_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


if __name__ == '__main__':
    cli()