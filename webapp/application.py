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


@app.route('/results', methods=["GET"])
def results():
    id = request.args.get("id")
    msg = ""
    if request.args.get("err"):
        if int(request.args.get("err")) == 1:
            msg = "Email you entered does not exist."

    print(msg)
    if id:
        cur = mysql.connection.cursor()
        cur.execute(
            "SELECT AVG(`pas-score`), AVG(`per-score`), AVG(`con-score`), AVG(`res-score`), AVG(`crg-score`) FROM `bit-response`")
        avgData = list(cur.fetchall())
        cur.execute(
            f"SELECT `pas-score`, `per-score`, `con-score`, `res-score`, `crg-score` FROM `bit-response` WHERE `id` = {id} ")
        data = cur.fetchall()
        cur.execute("""
            SELECT `name`, `final-score`, FIND_IN_SET( `final-score`, (
            SELECT GROUP_CONCAT( DISTINCT `final-score`
            ORDER BY `final-score` DESC ) FROM `bit-response`)
            ) AS `rank`
            FROM `bit-response` ORDER BY `rank` ASC
        """)
        lbrd = cur.fetchall()
        larr = []
        for x in lbrd:
            if list(x) not in larr:
                larr.append(list(x))
        print(larr[:5])
        cur.close()
        avgData = [int(x) for x in avgData[0]]
        data = list(data[0])
        return render_template('dashboard.html', data=data, avgs=avgData, larr=larr)
    else:
        return render_template('results.html', msg=msg)


@app.route('/checkUser', methods=["POST"])
def cuser():
    if request.method == "POST":
        email = request.form.get('email')
        cur = mysql.connection.cursor()
        cur.execute(
            f"SELECT `id` FROM `bit-response` WHERE `email` = '{email}' ORDER BY `id` DESC LIMIT 1")
        data = cur.fetchall()
        if len(data) >= 1:
            return redirect(f"/results?id={data[0][0]}")
        else:
            return redirect("/results?err=1")


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
