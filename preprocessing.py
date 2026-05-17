import pandas as pd

pd.set_option('display.max_columns', 25)
pd.set_option('display.width', 1000)

df = pd.read_csv('csv/dataset.csv')
print(df)

print(df.info())
print(df.describe())