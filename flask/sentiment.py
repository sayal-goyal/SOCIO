import pickle
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer

df = pd.read_csv('flask/modified_comment_data.csv')
df.dropna(inplace=True)
X = df['text']
y = df['sentiment']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=42)
tfidf = TfidfVectorizer()
X_train_tfidf = tfidf.fit_transform(X_train)
X_test_tfidf = tfidf.transform(X_test)

log_reg_model = LogisticRegression(max_iter=1000, solver='saga')
log_reg_model.fit(X_train_tfidf, y_train)
y_pred_log_reg = log_reg_model.predict(X_test_tfidf)


save_tdidf = open("flask/tdidfVector.pkl", "wb")
pickle.dump(tfidf, save_tdidf)
save_tdidf.close()

save_classifier = open("flask/sentiment.pickle","wb")
pickle.dump(log_reg_model, save_classifier)
save_classifier.close()