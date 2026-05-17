import pandas as pd
import os

pd.set_option('display.max_columns', 25)
pd.set_option('display.width', 1000)


res = pd.DataFrame({
})

print(os.listdir('csv'))
df = pd.read_excel('csv/доля_зож.xls', header=1)
print(df)

res['region'] = df.iloc[:,0]
res['health_ratio'] = df['Среднее']
print(res)

res['region'] = res['region'].str.strip()

df = pd.read_excel('csv/доля_несовершеннолетних_участников_преступлений.xls', header=1)
df['mean'] = df.iloc[:, 1:].mean(axis=1)
df[df.columns[0]] = df[df.columns[0]].str.strip()
res = res.merge(df[[df.columns[0], 'mean']], how='left', left_on='region', right_on=df.columns[0]).rename(columns={'mean':'ratio_underage_partic'})
res = res.drop(res.columns[len(res.columns)-2], axis = 1)
print(res)

df = pd.read_excel('csv/количество_дипломов_на100тыс_человек.xlsx', header=0)
df['mean'] = df.iloc[:, 1:].mean(axis=1)
print(df)

res = res.merge(df[[df.columns[0], 'mean']], how='left', left_on='region', right_on=df.columns[0]).rename(columns={'mean':'num_of_diplomas_on_100k'})
res = res.drop(res.columns[len(res.columns)-2], axis = 1)
print(res)

df = pd.read_excel('csv/коэф_джини.xls', header=2)
df['mean'] = df.iloc[:, 1:].mean(axis=1)
df[df.columns[0]] = df[df.columns[0]].str.strip()
res = res.merge(df[[df.columns[0], 'mean']], how='left', left_on='region', right_on=df.columns[0]).rename(columns={'mean':'coeff_Gini'})
res = res.drop(res.columns[len(res.columns)-2], axis = 1)
print(df)
print(res)

df = pd.read_excel('csv/Население,_не_употребляющее_табачные_и_нетабачные_курительные_и.xlsx', header=3)
print(df)
df['mean_male'] = df.iloc[1:, 1::2].mean(axis=1)
df['mean_female'] = df.iloc[1:, 2::2].mean(axis=1)
print(df)
df[df.columns[0]] = df[df.columns[0]].str.strip()
res = res.merge(df[[df.columns[0], 'mean_male', 'mean_female']], how='left', left_on='region', right_on=df.columns[0]).rename(columns={'mean_male':'not_smoking_male%', 'mean_female':'not_smoking_female%'})
res = res.drop(res.columns[len(res.columns)-3], axis = 1)

print(res)

df = pd.read_excel('csv/преступление_лица.xls', header=1)
df['mean'] = df.iloc[:, 1:].mean(axis=1)
df[df.columns[0]] = df[df.columns[0]].str.strip()
res = res.merge(df[[df.columns[0], 'mean']], how='left', left_on='region', right_on=df.columns[0]).rename(columns={'mean':'num_of_criminals'})
res = res.drop(res.columns[len(res.columns)-2], axis = 1)
print(res)


df = pd.read_excel('csv/преступления_алкогольное_опьянение.xls', header=1)
df['mean'] = df.iloc[:, 1:].mean(axis=1)
df[df.columns[0]] = df[df.columns[0]].str.strip()
res = res.merge(df[[df.columns[0], 'mean']], how='left', left_on='region', right_on=df.columns[0]).rename(columns={'mean':'num_of_alcohol_crimes'})
res = res.drop(res.columns[len(res.columns)-2], axis = 1)
print(res)

df = pd.read_excel('csv/преступления_женщины.xls', header=1)
df[df.columns[0]] = df[df.columns[0]].str.strip()
res = res.merge(df[[df.columns[0], 'Среднее']], how='left', left_on='region', right_on=df.columns[0]).rename(columns={'Среднее':'num_of_female_crimes'})
res = res.drop(res.columns[len(res.columns)-2], axis = 1)
print(res)

df = pd.read_excel('csv/преступления_нарко_опьянение.xls', header=1)
df['mean'] = df.iloc[:, 1:].mean(axis=1)
df[df.columns[0]] = df[df.columns[0]].str.strip()
res = res.merge(df[[df.columns[0], 'mean']], how='left', left_on='region', right_on=df.columns[0]).rename(columns={'mean':'num_of_drugs_crimes'})
res = res.drop(res.columns[len(res.columns)-2], axis = 1)
print(res)

df = pd.read_excel('csv/преступления_несовершеннолетние.xls', header=1)
df[df.columns[0]] = df[df.columns[0]].str.strip()
res = res.merge(df[[df.columns[0], 'Среднее']], how='left', left_on='region', right_on=df.columns[0]).rename(columns={'Среднее':'num_of_underaged_criminals'})
res = res.drop(res.columns[len(res.columns)-2], axis = 1)
print(res)

df = pd.read_excel('csv/рейтинговый_балл_качества_жизни.xlsx', header=0)
df[df.columns[0]] = df[df.columns[0]].str.strip()
res = res.merge(df[[df.columns[0], 'среднее']], how='left', left_on='region', right_on=df.columns[0]).rename(columns={'среднее':'life_quality'})
res = res.drop(res.columns[len(res.columns)-2], axis = 1)
print(res)

df = pd.read_excel('csv/численность_населения.xlsx')
df[df.columns[0]] = df[df.columns[0]].str.strip()
res = res.merge(df[[df.columns[0], 'Среднее']], how='left', left_on='region', right_on=df.columns[0]).rename(columns={'Среднее':'population_size'})
res = res.drop(res.columns[len(res.columns)-2], axis = 1)
print(res)

df = pd.read_excel('csv/Число_зарегистрированных_преступлений_в_России.xlsx', header=1)
df['mean'] = df.iloc[:, 1:].mean(axis=1)
df[df.columns[0]] = df[df.columns[0]].str.strip()
res = res.merge(df[[df.columns[0], 'mean']], how='left', left_on='region', right_on=df.columns[0]).rename(columns={'mean':'num_of_crimes'})
res = res.drop(res.columns[len(res.columns)-2], axis = 1)
print(res)

res.to_csv('csv/dataset.csv', index=False)