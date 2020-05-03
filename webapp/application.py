from flask import Flask, request, render_template, jsonify, redirect
from flask_mysqldb import MySQL
from score import scoring
application = app = Flask(__name__,  template_folder='frontend',
            static_folder="frontend/assets/")

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'projectbit'
app.config['MYSQL_DB'] = 'bit-db'
app.config['MYSQL_HOST'] = 'projectbit.cyhengy6zww6.us-west-2.rds.amazonaws.com'

mysql = MySQL(app)

@app.route('/')
def index_page():
    return redirect("/survey")

@app.route('/results.html')
def results_page():
    return redirect("/results")

@app.route('/post', methods=['POST'])
def post_data():
    if request.method == "POST":
        cur = mysql.connection.cursor()
        data = request.get_json()
        stmt = "INSERT INTO `bit-response` (`name`, `email`, "
        for i in range(1, 39):
            stmt += f"`Q{i}-Ans`, `Q{i}-Time`, "
        stmt += f"`Demo1`, `Demo2`, `Demo3`, `Demo4` ) VALUES ( '{data[0]['name']}', '{data[0]['email']}', "
        for i in range(1, 39):
            stmt += f"'{data[0]['Q'+str(i)+'-Ans']}', '{data[1]['Q'+str(i)+'-Time']}', "
        stmt += f"'{data[0]['Demo1']}', '{data[0]['Demo2']}', '{data[0]['Demo3']}', '{data[0]['Demo4']}')"
        cur.execute(stmt)
        mysql.connection.commit()
        cur.close()
        cur = mysql.connection.cursor()
        scores = scoring(cur)
        scores.addScores()
        mysql.connection.commit()
        cur.close()

    return jsonify({"success": True})


@app.route('/survey')
def survey():
    cur = mysql.connection.cursor()
    cur.execute("SELECT `question` FROM `bit-questions` ")
    data = cur.fetchall()
    return render_template('index.html', data=data)

@app.route('/results')
def results():
    return render_template('results.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
