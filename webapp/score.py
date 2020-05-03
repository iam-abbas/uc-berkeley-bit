import pickle
import numpy as np

class scoring:
    
    def __init__(self, cur):
        self.cur = cur

    def addScores(self):
        cur = self.cur
        with open('models/passion.pkl', 'rb') as f:
            pas = pickle.load(f)
        with open('models/_con.pkl', 'rb') as f:
            con = pickle.load(f)
        with open('models/crg.pkl', 'rb') as f:
            crg = pickle.load(f)
        with open('models/pers.pkl', 'rb') as f:
            pers = pickle.load(f)
        with open('models/res.pkl', 'rb') as f:
            res = pickle.load(f)
        passion_arr = ['Q10.Ans', 'Q11.Ans', 'Q12.Ans', 'Q13.Ans', 'Q14.Ans', 'Q15.Ans', 'Q16.Ans', 'Q17.Ans']
        con_arr = ['Q31.Ans', 'Q32.Ans', 'Q33.Ans', 'Q34.Ans', 'Q35.Ans', 'Q36.Ans', 'Q37.Ans', 'Q38.Ans']
        courage_arr = ['Q26.Ans', 'Q27.Ans', 'Q28.Ans', 'Q29.Ans', 'Q30.Ans']
        per_arr = ['Q18.Ans', 'Q19.Ans', 'Q20.Ans', 'Q21.Ans', 'Q22.Ans', 'Q23.Ans', 'Q24.Ans', 'Q25.Ans']
        res_arr = ['Q1.Ans','Q2.Ans','Q3.Ans','Q4.Ans','Q5.Ans','Q6.Ans','Q7.Ans','Q8.Ans','Q9.Ans']
        con_arr = "`, `".join([x.replace(".", "-") for x in con_arr])
        res_arr = "`, `".join([x.replace(".", "-") for x in res_arr])
        courage_arr = "`, `".join([x.replace(".", "-") for x in courage_arr])
        passion_arr = "`, `".join([x.replace(".", "-") for x in passion_arr])
        per_arr = "`, `".join([x.replace(".", "-") for x in per_arr])
        cur.execute("SELECT `id`, `"+passion_arr+"` FROM `bit-response`")
        query = [list(x) for x in cur.fetchall()]
        print(query[0])
        print(pas.predict([query[0][1:]])[0])
        for u_row in query:
            score = np.round(pas.predict([u_row[1:]])[0], decimals=3)
            cur.execute(f"UPDATE `bit-response` SET `pas-score` = {score} WHERE `id` = {u_row[0]} AND `pas-score` = 0 ")
        cur.execute("SELECT `id`, `"+res_arr+"` FROM `bit-response`")
        query = [list(x) for x in cur.fetchall()]
        print(query[0])
        print(res.predict([query[0][1:]])[0])
        for u_row in query:
            score = np.round(res.predict([u_row[1:]])[0], decimals=3)
            cur.execute(f"UPDATE `bit-response` SET `res-score` = {score} WHERE `id` = {u_row[0]} AND `res-score` = 0 ")
        cur.execute("SELECT `id`, `"+con_arr+"` FROM `bit-response`")
        query = [list(x) for x in cur.fetchall()]
        print(query[0])
        print(con.predict([query[0][1:]])[0])
        for u_row in query:
            score = np.round(con.predict([u_row[1:]])[0], decimals=3)
            cur.execute(f"UPDATE `bit-response` SET `con-score` = {score} WHERE `id` = {u_row[0]} AND `con-score` = 0 ")
        cur.execute("SELECT `id`, `"+courage_arr+"` FROM `bit-response`")
        query = [list(x) for x in cur.fetchall()]
        print(query[0])
        print(crg.predict([query[0][1:]])[0])
        for u_row in query:
            score = np.round(crg.predict([u_row[1:]])[0], decimals=3)
            cur.execute(f"UPDATE `bit-response` SET `crg-score` = {score} WHERE `id` = {u_row[0]} AND `crg-score` = 0 ")
        cur.execute("SELECT `id`, `"+per_arr+"` FROM `bit-response`")
        query = [list(x) for x in cur.fetchall()]
        print(query[0])
        print(pers.predict([query[0][1:]])[0])
        for u_row in query:
            score = np.round(pers.predict([u_row[1:]])[0], decimals=3)
            cur.execute(f"UPDATE `bit-response` SET `per-score` = {score} WHERE `id` = {u_row[0]} AND `per-score` = 0 ")