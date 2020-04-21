import MySQLdb
import pandas as pd

db = MySQLdb.connect(host="projectbit.cyhengy6zww6.us-west-2.rds.amazonaws.com",    # your host, usually localhost
                     user="root",         # your username
                     passwd="projectbit",  # your password
                     db="bit-db")        # name of the data base


cur = db.cursor()

cur.execute("SELECT * FROM `bit-response`")
query = cur.fetchall()

df = pd.DataFrame(query)

cur.execute("SHOW columns FROM `bit-response`")
query = cur.fetchall()

cols = [x[0] for x in query]
df.columns = cols

df.to_csv(r'data.csv', index=False)

db.close()