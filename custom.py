from flask import request

class CustomSession:
    def __init__(self):
        self.sessions = {}

    def __getitem__(self, key):
        session_id = request.cookies.get(key)
        if session_id not in self.sessions:
            self.sessions[session_id] = {}
        return self.sessions[session_id]

    def __setitem__(self, key, value):
        session_id = request.cookies.get(key)
        if session_id not in self.sessions:
            self.sessions[session_id] = {}
        self.sessions[session_id] = value
