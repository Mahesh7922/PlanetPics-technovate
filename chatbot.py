import streamlit as st
from dotenv import load_dotenv
import os
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Set up Gemini API key from environment variable
genai.configure(api_key="AIzaSyAM3wT7PuRu8em257MNJWyBQPYBqxQhSWc")

st.title("Eco-Bot")
# 🩺
USER_AVATAR = "👤"
BOT_AVATAR = "🌱"

# Initialize or load chat history
if "messages" not in st.session_state:
    st.session_state["messages"] = []

# Sidebar with a button to delete chat history
with st.sidebar:
    if st.button("Delete Chat History"):
        st.session_state.messages = []

# Display chat messages
for message in st.session_state.messages:
    avatar = USER_AVATAR if message["role"] == "user" else BOT_AVATAR
    with st.chat_message(message["role"], avatar=avatar):
        st.markdown(message["content"])

# Function to call the Gemini API
def get_gemini_response(prompt):
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text

# Allow users to input text via text box
if prompt := st.chat_input("How can I help?"):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user", avatar=USER_AVATAR):
        st.markdown(prompt)

    # Call Gemini API for assistant response
    with st.chat_message("assistant", avatar=BOT_AVATAR):
        message_placeholder = st.empty()
        full_response = get_gemini_response(prompt)
        message_placeholder.markdown(full_response)

    st.session_state.messages.append({"role": "assistant", "content": full_response})
