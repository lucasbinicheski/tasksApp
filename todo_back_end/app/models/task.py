from app.main import db


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500))
    done = db.Column(db.Boolean, default=False)

    def __init__(self, title, description):
        self.title = title
        self.description = description
