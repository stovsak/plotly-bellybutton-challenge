import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlachemy import create_engine

from flask import Flask, jasonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#######################################
# Database Setup
#######################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/bellybutton.sqlite"
db = SQLAlchemy(app)

# new model
Base = automap_base()
Base.prepare(db.engine, reflect=True)

# save model/table
Samples_Metadata = Base.classes.Samples_Metadata
Samples = Base.classes.samples

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/names")
def names():
    """Return a list of sample names"""
    stmt = db.session.query(Samples).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    return jasonify(list(df.columns)[2:])


