from flask import Flask, request
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'project-bit'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = 3333

mysql = MySQL(app)



@app.route('/post', methods=['POST'])
def hello_world():
        data = request.get_json()
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO `users` ( `name`, `email`, `age`) VALUES ('hey', 'asa', 1)")
        mysql.connection.commit()
        cur.close()
        return "success"


@app.route('/')
def hey():
    my_string1 = '''
    <form method="POST" action="/post">
    <input type='text' name='name'>
    <input type='email' name='email'>
    <input type='text' name='age'>
    <input type='text' name='q1'>
    <input type="submit">
    </form>
    '''
    return my_string1

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True, debug=True)