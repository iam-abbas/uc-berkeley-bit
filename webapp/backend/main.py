from flask import Flask, request, render_template
from flask_mysqldb import MySQL

app = Flask(__name__,  template_folder='../frontend', static_folder="../frontend/assets/")

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'project-bit'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = 3333

mysql = MySQL(app)


# @app.route('/post', methods=['POST'])
# def hello_world():
#     data = request.get_json()
#     cur = mysql.connection.cursor()
#     Q = f'''
# INSERT INTO
#     `bit-response` (
#         `name`,
#         `email`,
#         'Q1-Ans',
#         'Q1-Time',
#         'Q2-Ans',
#         'Q2-Time',
#         'Q3-Ans',
#         'Q3-Time',
#         'Q4-Ans',
#         'Q4-Time',
#         'Q5-Ans',
#         'Q5-Time',
#         'Q6-Ans',
#         'Q6-Time',
#         'Q7-Ans',
#         'Q7-Time',
#         'Q8-Ans',
#         'Q8-Time',
#         'Q9-Ans',
#         'Q9-Time',
#         'Q10-Ans',
#         'Q10-Time',
#         'Q11-Ans',
#         'Q11-Time',
#         'Q12-Ans',
#         'Q12-Time',
#         'Q13-Ans',
#         'Q13-Time',
#         'Q14-Ans',
#         'Q14-Time',
#         'Q15-Ans',
#         'Q15-Time',
#         'Q16-Ans',
#         'Q16-Time',
#         'Q17-Ans',
#         'Q17-Time',
#         'Q18-Ans',
#         'Q18-Time',
#         'Q19-Ans',
#         'Q19-Time',
#         'Q20-Ans',
#         'Q20-Time',
#         'Q21-Ans',
#         'Q21-Time',
#         'Q22-Ans',
#         'Q22-Time',
#         'Q23-Ans',
#         'Q23-Time',
#         'Q24-Ans',
#         'Q24-Time',
#         'Q25-Ans',
#         'Q25-Time',
#         'Q26-Ans',
#         'Q26-Time',
#         'Q27-Ans',
#         'Q27-Time',
#         'Q28-Ans',
#         'Q28-Time',
#         'Q29-Ans',
#         'Q29-Time',
#         'Q30-Ans',
#         'Q30-Time',
#         'Q31-Ans',
#         'Q31-Time',
#         'Q32-Ans',
#         'Q32-Time',
#         'Q33-Ans',
#         'Q33-Time',
#         'Q34-Ans',
#         'Q34-Time',
#         'Q35-Ans',
#         'Q35-Time',
#         'Q36-Ans',
#         'Q36-Time',
#         'Q37-Ans',
#         'Q37-Time',
#         'Q38-Ans',
#         'Q38-Time',
#         'Demo1',
#         'Demo2'
#     )
# VALUES
#     ('hey', 'asa', 1)
#     '''
#     cur.execute()
#     mysql.connection.commit()
#     cur.close()
#     return "success"


@app.route('/survey')
def hey():
    cur = mysql.connection.cursor()
    cur.execute("SELECT `question` FROM `bit-questions`")
    data = cur.fetchall()
    return render_template('index.html', data=data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True, debug=True)

    # ALTER TABLE `bit-response` ADD `Q1-Ans` INT(11) NOT NULL AFTER `info-2`, ADD `Q1-Time` INT(11) NOT NULL AFTER `Q1-Ans`;

    ##
