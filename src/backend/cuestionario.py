from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # Permitir peticiones desde React

# Configurar la API de Gemini
genai.configure(api_key="TU_API_KEY")  # Reemplaza con tu API Key
modelo = genai.GenerativeModel("gemini-1.5-pro-latest")

# 🔹 Ruta para generar una pregunta
@app.route("/generar_pregunta", methods=["POST"])
def generar_pregunta():
    try:
        data = request.get_json()
        materia = data.get("materia", "matemáticas")  # Si no envían materia, usa matemáticas

        # Prompt para generar pregunta en formato JSON
        prompt = f"""
        Genera una pregunta de opción múltiple sobre {materia}. 
        Formato JSON:
        {{"pregunta": "...", "opciones": ["A", "B", "C", "D"], "respuesta_correcta": "..."}}
        """

        respuesta = modelo.generate_content(prompt)

        return jsonify(respuesta.text)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🔹 Ruta para evaluar la respuesta del usuario
@app.route("/evaluar_respuesta", methods=["POST"])
def evaluar_respuesta():
    try:
        data = request.get_json()
        pregunta = data["pregunta"]
        respuesta_usuario = data["respuesta_usuario"]
        respuesta_correcta = data["respuesta_correcta"]

        # Prompt para evaluación
        prompt = f"El usuario respondió '{respuesta_usuario}' a la pregunta '{pregunta}'. La respuesta correcta es '{respuesta_correcta}'. Evalúa y explica brevemente."
        respuesta = modelo.generate_content(prompt)

        return jsonify({"evaluacion": respuesta.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)
