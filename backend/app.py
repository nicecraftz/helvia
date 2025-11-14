from flask import Flask

app = Flask("helvia-backend")

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"