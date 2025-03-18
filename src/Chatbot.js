import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
    const [pregunta, setPregunta] = useState("");
    const [conversacion, setConversacion] = useState([]);
    const [escribiendo, setEscribiendo] = useState(false);
    const [minimizado, setMinimizado] = useState(false);

    const enviarPregunta = async () => {
        if (!pregunta.trim()) return;

        const nuevaConversacion = [...conversacion, { tipo: "usuario", texto: pregunta }];
        setConversacion(nuevaConversacion);
        setPregunta("");
        setEscribiendo(true);

        try {
            const response = await axios.post("https://backend-tutoria.onrender.com/preguntar", { pregunta });
            setTimeout(() => {
                setEscribiendo(false);
                setConversacion([...nuevaConversacion, { tipo: "bot", texto: response.data.respuesta }]);
            }, 1000);
        } catch (error) {
            console.error("Error al conectar con el backend:", error);
            setTimeout(() => {
                setEscribiendo(false);
                setConversacion([...nuevaConversacion, { tipo: "bot", texto: "Hubo un error, intenta de nuevo." }]);
            }, 1000);
        }
    };

    return (
        <div style={{ ...styles.chatContainer, height: minimizado ? "50px" : "450px" }}>
            <div style={styles.chatHeader}>
                <span>🤖 TutorIA</span>
                <button onClick={() => setMinimizado(!minimizado)} style={styles.minimizeButton}>
                    {minimizado ? "🔼" : "🔽"}
                </button>
            </div>
            {!minimizado && (
                <>
                    <div style={styles.chatBody}>
                        {conversacion.map((msg, index) => (
                            <div key={index} style={msg.tipo === "usuario" ? styles.userMessage : styles.botMessage}>
                                {msg.texto}
                            </div>
                        ))}
                        {escribiendo && <div style={styles.botMessage}>Escribiendo...</div>}
                    </div>
                    <div style={styles.chatFooter}>
                        <input 
                            type="text" 
                            value={pregunta} 
                            onChange={(e) => setPregunta(e.target.value)} 
                            placeholder="Escribe tu pregunta..." 
                            style={styles.input}
                        />
                        <button onClick={enviarPregunta} style={styles.button}>Enviar</button>
                    </div>
                </>
            )}
        </div>
    );
};

const styles = {
    chatContainer: {
        width: "350px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
        transition: "height 0.3s ease",
    },
    chatHeader: {
        backgroundColor: "#001F3D",
        color: "#fff",
        padding: "15px",
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    minimizeButton: {
        background: "none",
        border: "none",
        color: "#fff",
        fontSize: "16px",
        cursor: "pointer",
    },
    chatBody: {
        flex: 1,
        padding: "10px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
    },
    chatFooter: {
        display: "flex",
        padding: "10px",
        borderTop: "1px solid #ddd",
    },
    input: {
        flex: 1,
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        outline: "none",
    },
    button: {
        marginLeft: "10px",
        padding: "10px 15px",
        border: "none",
        backgroundColor: "#001F3D",
        color: "#fff",
        borderRadius: "5px",
        cursor: "pointer",
    },
    userMessage: {
        alignSelf: "flex-end",
        backgroundColor: "#001F3D",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "10px",
        margin: "5px",
        maxWidth: "70%",
    },
    botMessage: {
        alignSelf: "flex-start",
        backgroundColor: "#f1f1f1",
        color: "#333",
        padding: "8px 12px",
        borderRadius: "10px",
        margin: "5px",
        maxWidth: "70%",
    }
};

export default Chatbot;