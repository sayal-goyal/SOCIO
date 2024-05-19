import re
import pickle
import pandas as  pd
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.model_selection import train_test_split

df = pd.read_json('flask/Modified_News_Category_Dataset.json', lines = True)

def remove_tags(text):
  remove = re.compile(r'')
  return re.sub(remove, '', text)
df['headline'] = df['headline'].apply(remove_tags)

def special_char(text):
  reviews = ''
  for x in text:
    if x.isalnum():
      reviews = reviews + x
    else:
      reviews = reviews + ' '
  return reviews
df['headline'] = df['headline'].apply(special_char)

def convert_lower(text):
   return text.lower()
df['headline'] = df['headline'].apply(convert_lower)

n1 = LabelEncoder()
df['category'] = n1.fit_transform(df['category'])

X = df['headline']  +  " " + df['short_description']
Y = df['category']

count_vect = CountVectorizer()
X_counts = count_vect.fit_transform(X)

tfidf = TfidfTransformer()
X_train_tfidf = tfidf.fit_transform(X_counts)
X_train, X_test, Y_train, Y_test = train_test_split(X_train_tfidf, Y, test_size=0.3, random_state=42)

logistic_Regression = LogisticRegression(max_iter=1000, solver='saga')
logistic_Regression.fit(X_train,Y_train)
predictions = logistic_Regression.predict(X_test)

save_tdidf = open("flask/tdidfTransformer.pkl", "wb")
pickle.dump(tfidf, save_tdidf)
save_tdidf.close()

save_count = open("flask/countvector.pkl", "wb")
pickle.dump(count_vect, save_count)
save_count.close()

save_classifier = open("flask/news.pickle","wb")
pickle.dump(logistic_Regression, save_classifier)
save_classifier.close()