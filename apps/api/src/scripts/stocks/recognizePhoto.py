from flask import Flask, request, jsonify
import torch
from PIL import Image
from torchvision import transforms
import clip
import faiss
import numpy as np

app = Flask(__name__)

# Load CLIP model
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# Assume FAISS index pre-built
index = faiss.read_index("products.index")

@app.route("/search", methods=["POST"])
def search():
    file = request.files["image"]
    image = preprocess(Image.open(file.stream)).unsqueeze(0).to(device)
    
    with torch.no_grad():
        embedding = model.encode_image(image).cpu().numpy()
    
    # Search in FAISS
    D, I = index.search(embedding, 5)  # top 5 matches
    return jsonify({"ids": I.tolist(), "distances": D.tolist()})
