from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

genai.configure(api_key=os.getenv("API_KEY"))

@app.route("/analizar_tarea", methods=["POST"])
def analizar_tarea():
    try:
        data = request.get_json()
        consigna = data.get("consigna")

        if not consigna:
            return jsonify({"error": "No se recibió una consigna"}), 400

        prompt = f"""
Eres un asistente educativo. Analiza la siguiente consigna y responde:
1. ¿Qué pasos debe seguir el estudiante?
2. ¿Qué tipo de texto se espera?
3. ¿Qué no debe olvidar incluir?
4. ¿Qué errores suelen cometer los estudiantes?

Consigna:
\"{consigna}\"
"""

        modelo = genai.GenerativeModel("gemini-2.0-flash")
        respuesta = modelo.generate_content(prompt)

        return jsonify({"respuesta": respuesta.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
