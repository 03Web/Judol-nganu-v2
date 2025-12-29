import traceback
from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# --- CONFIG ---
SYMBOLS = ["🍒", "🍋", "🔔", "💎", "7️⃣"]
PAYOUTS = {"🍒": 2, "🍋": 3, "🔔": 5, "💎": 10, "7️⃣": 20}
GAME_STATE = {"balance": 1000}
GAME_PATTERN = ["WIN", "WIN", "LOSE"] # Pola curang
SPIN_COUNT = 0

@app.route('/')
def index():
    try:
        return render_template('index.html', balance=GAME_STATE["balance"])
    except Exception:
        print(traceback.format_exc())
        return "Error loading template. Cek apakah folder 'templates' dan file 'index.html' sudah benar?", 500

@app.route('/spin', methods=['POST'])
def spin():
    global SPIN_COUNT
    try:
        # --- LOGIKA UTAMA ---
        bet_input = request.form.get('bet', 10)
        bet = int(bet_input)

        if bet > GAME_STATE["balance"]:
            return jsonify({"status": "error", "message": "Saldo Kurang!"})

        GAME_STATE["balance"] -= bet

        # Logika Curang
        current_fate = GAME_PATTERN[SPIN_COUNT % len(GAME_PATTERN)]
        SPIN_COUNT += 1

        row1 = [random.choice(SYMBOLS) for _ in range(3)]
        row3 = [random.choice(SYMBOLS) for _ in range(3)]
        
        if current_fate == "WIN":
            win_sym = random.choice(SYMBOLS)
            row2 = [win_sym, win_sym, win_sym]
        else:
            row2 = ["🍒", "🔔", "💎"] # Pasti beda

        # Hitung Menang
        winnings = 0
        is_win = False
        if row2[0] == row2[1] == row2[2]:
            symbol = row2[0]
            winnings = bet * PAYOUTS.get(symbol, 0)
            GAME_STATE["balance"] += winnings
            is_win = True

        return jsonify({
            "status": "success",
            "rows": [row1, row2, row3],
            "winnings": winnings,
            "balance": GAME_STATE["balance"],
            "is_win": is_win
        })

    except Exception as e:
        # --- PENANGKAP ERROR ---
        print("\n" + "!"*30)
        print("ERROR TERDETEKSI:")
        print(traceback.format_exc()) # Tampilkan detail error di terminal
        print("!"*30 + "\n")
        return jsonify({"status": "error", "message": "Server Error (Lihat Terminal)"}), 500

@app.route('/reset', methods=['POST'])
def reset():
    GAME_STATE["balance"] = 1000
    return jsonify({"balance": 1000})

if __name__ == '__main__':
    # Ganti port ke 5001 agar tidak bentrok dengan proses lama
    app.run(debug=True, port=5001)