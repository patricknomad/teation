print("Starting initialize.py")

# %% [markdown]
# # Logging

# %%
import logging

logging.basicConfig(format="%(levelname)s - %(name)s -  %(message)s", level=logging.WARNING)
logging.getLogger("haystack").setLevel(logging.INFO)

# %% [markdown]
# # Configurations

# %%
import os
os.environ["HAYSTACK_TELEMETRY_ENABLED"] = "False"
os.environ["TOKENIZERS_PARALLELISM"] = "false"

# %% [markdown]
# # Document Store

# %%
import os
from haystack.document_stores import ElasticsearchDocumentStore

# Get the host where Elasticsearch is running
document_store = ElasticsearchDocumentStore(host="elasticsearch", username="", password="", index="document")

# %% [markdown]
# # Preprocessing of documents

# %%
import pandas as pd
file_path = "/opt/data/segments.csv"
df = pd.read_csv(file_path)

# cleanup
df.fillna(value="", inplace=True)
df["text"] = df["text"].apply(lambda x: x.strip())
df = df.rename(columns={"text": "content"})

# print(df.head())
print(df.count)

# %%
docs = df.to_dict(orient="records")

from pprint import pprint
# pprint(docs[:3])

# %% [markdown]
# # Write documents

# %%
# docs = docs[:100] # max for testing
document_store.delete_documents()
document_store.write_documents(docs)
