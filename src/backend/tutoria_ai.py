import google.generativeai as genai

genai.configure(api_key="AIzaSyD6r8C_Re6dQamxZQJbUPXj_wk0y6DXkaU")


modelo = genai.GenerativeModel("gemini-1.5-pro-latest")

def chatbot():
    print("👨‍🏫 TutorIA Chatbot - Pregunta sobre Ingeniería:")
    
    while True:
        pregunta = input("Tú: ")
        
        if pregunta.lower() in ["salir", "exit", "adiós"]:
            print("TutorIA: ¡Hasta luego! 📚")
            break
        
        respuesta = modelo.generate_content(pregunta)
        print(f"TutorIA: {respuesta.text}\n")

chatbot()
