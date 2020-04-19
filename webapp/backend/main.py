from flask import Flask, request, render_template, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__,  template_folder='../frontend', static_folder="../frontend/assets/")

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'project-bit'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = 3333

mysql = MySQL(app)


@app.route('/post', methods=['POST'])
def hello_world():
    if request.method == "POST":
        cur = mysql.connection.cursor()
        data = request.get_json()
        stmt = "INSERT INTO `bit-response` (`name`, "
        for i in range(1, 2):
            stmt += f"`Q{i}-Ans`, `Q{i}-Time`, "
        stmt += f"`Demo1`) VALUES ( '{data[0]['name']}', "
        for i in range(1, 2):
            stmt += f"'{data[0]['Q'+str(i)+'-Ans']}', '{data[1]['Q'+str(i)+'-Time']}', "
        stmt += f"'{data[0]['Demo1']}')"
        cur.execute(stmt)
        mysql.connection.commit()
        cur.close()
    return jsonify({"success":True})

@app.route('/survey')
def survey():
    cur = mysql.connection.cursor()
    cur.execute("SELECT `question` FROM `bit-questions`")
    data = cur.fetchall()
    return render_template('index.html', data=data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True, debug=True)
