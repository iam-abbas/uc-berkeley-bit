# GRIT
Measuring Human Perseverance


# Usage Guidelines

### Download Modules
- ```pip install -r requirements.txt```
##### For Windows
- Windows doesn't have a module for mysqlclient. So before you you install `requirements.txt`. Execute the following command in `\webapp`.
- ``` pip install wheel/mysqlclient-1.4.6-cp38-cp38-win32.whl```

### Run on localhost.

- Now just run application.py with:
- ```python application.py```
- You should be able to use the application on `localhost:5000`

# Contribution Guidelines

### Branches
- ***master*** (dafult)
- dev
- BII
- BEQI

##### Desctiptions 

- **master:** This is main/primary branch. The code here works and is thoughly tested with different environments. 
- **dev:** This is the development branch where code **works** but is not thoroughly tested.
- **BII:** This is a view-only branch. Please do not push code here. This is for reference only.
- **BEQI:** Similar to BII but has BEQI related content.


### I made something or fixed something where do I push

- Please make your own branch and test it on your local machine. Always base your branch of **Dev** not master. If it works then push it to **Dev** and add someone to review it. 
- If you are asked to review PRs on Dev please check if it works on your local machine as well.
- If you are asked to review PRs on **master** please test is thorougly before merging.
- Remember to delete your branch after you have merged.

###### Note: Use slack and issues page for reporting issues and bugs.
