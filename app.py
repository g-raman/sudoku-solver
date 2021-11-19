from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('play.html')

@app.route('/create')
def play():
    return render_template('create.html')

@app.route('/about')
def about():
    return render_template('about.html')