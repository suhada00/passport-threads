# mock_server.py
# A lightweight local mock server supporting GET for static files and POST for mock APIs

import http.server
import json
import os
import hashlib
from urllib.parse import urlparse, parse_qs

def generate_mock_passport(username, lang="en", manual_bio=None):
    username_clean = (username or '').replace('@', '').strip().lower()
    if not username_clean:
        username_clean = "wanderer"
    
    # Deterministic generation using md5 hash of the username
    h = hashlib.md5(username_clean.encode('utf-8')).hexdigest()
    # Convert hex characters to integers for selection
    h_ints = [int(h[i:i+2], 16) for i in range(0, len(h), 2)]
    
    # Localized lists of fun attributes based on requested language
    if lang == "id":
        nations = [
            "Republik Debat Kusir",
            "Kerajaan Midnight Posting",
            "Federasi Thread Gantung",
            "Warga Online Kronis",
            "Republik Curhat Berlebihan",
            "Serikat Konten Adem Ayem",
            "Republik Repost Demokratis",
            "Suku Pengamat Hening",
            "Kekaisaran Sindiran Halus",
            "Tanah Drama Kutipan",
            "Negara Bebas Draf Abadi",
            "Perserikatan Pendapat Tanpa Diminta",
            "Kesultanan Lurker",
            "Keadipatian Algoritma Umpan Klik"
        ]
        titles = [
            "Kepala Bagian Galau Malam",
            "Lurker Agung",
            "Arsitek Debat Kusir",
            "Jenderal Penguji Vibe",
            "Pembuat Utas Profesional",
            "Pawang Algoritma",
            "Shitposter Bersertifikat",
            "Penjelajah Linimasa",
            "Penimbun Draf Teks",
            "Seniman Sindiran",
            "Kolektor GIF Reaksi",
            "Diplomat Online Kronis"
        ]
        taglines = [
            "Posting ke ruang hampa. Hampa menghargainya.",
            "Di sini untuk seru-seruan, bukan thread panjang.",
            "Draf saya lebih bagus daripada postingan Anda.",
            "Online di dunia maya, offline di dunia nyata.",
            "Saya datang, saya melihat, saya mengutip.",
            "Ini bukan drama, ini komentar sosial.",
            "Sedang mengetik...",
            "Vibe terverifikasi, fakta masih pending."
        ]
        all_stamps = [
            "Online Kronis",
            "Penyintas Scroll",
            "Penimbun Draf",
            "Pendeteksi Umpan",
            "Lencana Lurker",
            "Bandar Meme",
            "Raja Kutipan",
            "Ratu Kutipan",
            "Kecanduan Notif",
            "Master Vibe",
            "Posting Tengah Malam",
            "Pelopor Thread",
            "Kesayangan Algoritma"
        ]
        bio_summaries = [
            "Utamanya di sini hanya untuk menonton kekacauan sambil memegang draf.",
            "Legenda mengatakan mereka punya 500 draf dan tidak akan pernah diposting.",
            "Menghabiskan waktu 8 jam scroll dan 8 detik mengetik. Sangat efisien.",
            "Argumennya sangat panas sampai butuh sistem pendingin.",
            "Seorang lurker profesional yang sesekali merilis karya agung.",
            "Sendirian menjaga feed notifikasi tetap hidup.",
            "Sebuah teka-teki dalam bentuk utas. Scan profil AI mengonfirmasi 100% vibes."
        ]
    else:
        nations = [
            "Republic of Hot Takes",
            "Kingdom of Midnight Posting",
            "Federation of Unfinished Threads",
            "Commonwealth of the Chronically Online",
            "People's Republic of Oversharing",
            "United States of Wholesome Content",
            "Democratic Republic of Reposters",
            "Silent Observer Nation",
            "Empire of Subtweet Energy",
            "Land of Quote Unquote Drama",
            "Free State of Perpetual Drafts",
            "Nation of Unsolicited Opinions",
            "Sultanate of Lurkers",
            "Archduchy of Algorithmic Bait"
        ]
        titles = [
            "Chief Midnight Thoughts Officer",
            "Lurker Supreme",
            "Hot Take Architect",
            "Vibe Checker General",
            "Professional Thread Spinner",
            "Algorithm Whisperer",
            "Certified Shitposter",
            "Serial Scroller",
            "Draft Collector",
            "Subtweet Artisan",
            "Reaction GIF Connoisseur",
            "Chronically Online Diplomat"
        ]
        taglines = [
            "Posts into the void. The void appreciated it.",
            "Here for a good time, not a long thread.",
            "My drafts are better than your posts.",
            "Chronically online, locally offline.",
            "I came, I saw, I quoted.",
            "It's not drama, it's commentary.",
            "Usually typing...",
            "Vibes check out, facts are pending."
        ]
        all_stamps = [
            "Chronically Online",
            "Scroll Survivor",
            "Draft Hoarder",
            "Bait Detector",
            "Lurker Badge",
            "Meme Dealer",
            "Quote King",
            "Quote Queen",
            "Notification Addict",
            "Vibe Master",
            "Late Night Poster",
            "Thread Pioneer",
            "Algorithmic Sweetheart"
        ]
        bio_summaries = [
            "Mainly here to watch the chaos unfold while holding a draft.",
            "Legend says they have 500 drafts and none of them will ever see the light of day.",
            "Spends 8 hours scrolling and 8 seconds typing. Highly efficient.",
            "Their hot takes are so hot they need a cooling system.",
            "A professional lurker who occasionally drops a masterpiece.",
            "Single-handedly keeping the notification feeds alive.",
            "An enigma wrapped in a thread. AI profile scanning confirms 100% vibes."
        ]
    
    nation = nations[h_ints[0] % len(nations)]
    title = titles[h_ints[1] % len(titles)]
    tagline = taglines[h_ints[2] % len(taglines)]
    bio_summary = bio_summaries[h_ints[3] % len(bio_summaries)]
    
    # Pick 3 unique stamps
    selected_stamps = []
    stamp_idx = 4
    while len(selected_stamps) < 3 and stamp_idx < len(h_ints):
        stamp = all_stamps[h_ints[stamp_idx] % len(all_stamps)]
        if stamp not in selected_stamps:
            selected_stamps.append(stamp)
        stamp_idx += 1
    # Fallback if we couldn't get 3 unique ones
    while len(selected_stamps) < 3:
        for stamp in all_stamps:
            if stamp not in selected_stamps:
                selected_stamps.append(stamp)
                break
                
    # Deterministic scores between 30 and 99 for 10 custom traits
    scores = {
        "asbun": 30 + (h_ints[5] % 70),
        "sinis": 30 + (h_ints[6] % 70),
        "wholesome": 30 + (h_ints[7] % 70),
        "chaos": 30 + (h_ints[8] % 70),
        "baper": 30 + (h_ints[9] % 70),
        "receh": 30 + (h_ints[10] % 70),
        "halu": 30 + (h_ints[11] % 70),
        "fomo": 30 + (h_ints[12] % 70),
        "caper": 30 + (h_ints[13] % 70),
        "healing": 30 + (h_ints[14] % 70)
    }
    
    # Random-like but deterministic passport number: PT + 7 chars
    passport_chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    passport_num = "PT" + "".join(passport_chars[h_ints[i % len(h_ints)] % len(passport_chars)] for i in range(10, 17))
    
    # Capitalize username for display name
    display_name = username.replace('_', ' ').replace('.', ' ').title()
    avatar = f"https://api.dicebear.com/7.x/bottts/svg?seed={username_clean}"
    bio = manual_bio if manual_bio else f"A distinguished citizen of the {nation}. Often spotted sharing thoughts and checking vibes."

    # Detect mock country
    username_lower = username_clean.lower()
    detected_country = "US"
    
    # Simple keyword-based language/country detection
    if lang == "id" or any(x in username_lower for x in ["cekblack", "id", "indo", "jkt", "bali", "ktp", "kopi", "nasigoreng"]):
        detected_country = "ID"
    elif lang == "ja" or any(x in username_lower for x in ["jp", "tokyo", "anime", "sushi", "otaku"]):
        detected_country = "JP"
    elif lang == "ko" or any(x in username_lower for x in ["kr", "seoul", "kpop", "kimchi"]):
        detected_country = "KR"
    elif lang == "de" or any(x in username_lower for x in ["de", "berlin", "bier"]):
        detected_country = "DE"
    elif lang == "fr" or any(x in username_lower for x in ["fr", "paris", "croissant"]):
        detected_country = "FR"
    elif lang == "es" or any(x in username_lower for x in ["es", "madrid", "taco", "hola"]):
        detected_country = "MX" if "taco" in username_lower else "ES"
    elif lang == "pt" or any(x in username_lower for x in ["br", "samba", "rio"]):
        detected_country = "BR"
    elif any(x in username_lower for x in ["uk", "london", "gb", "queen", "king"]):
        detected_country = "GB"
    elif any(x in username_lower for x in ["ca", "toronto", "maple"]):
        detected_country = "CA"
    elif any(x in username_lower for x in ["ph", "manila"]):
        detected_country = "PH"
    elif any(x in username_lower for x in ["th", "bangkok"]):
        detected_country = "TH"
    elif any(x in username_lower for x in ["au", "sydney", "kangaroo"]):
        detected_country = "AU"
    elif any(x in username_lower for x in ["sg", "merlion"]):
        detected_country = "SG"
    elif any(x in username_lower for x in ["my", "kl"]):
        detected_country = "MY"
    elif any(x in username_lower for x in ["sa", "riyadh"]):
        detected_country = "SA"
    elif any(x in username_lower for x in ["tr", "istanbul"]):
        detected_country = "TR"
    elif any(x in username_lower for x in ["in", "delhi", "mumbai", "curry"]):
        detected_country = "IN"
    else:
        # Hashed country selection for variety in testing
        test_countries = ["US", "GB", "FR", "DE", "JP", "KR", "ID", "BR", "CA", "MX", "AU", "SG", "MY", "IN", "TR"]
        detected_country = test_countries[h_ints[12] % len(test_countries)]

    return {
        "success": True,
        "profile": {
            "username": username_clean,
            "name": display_name,
            "avatar": avatar,
            "bio": bio,
            "followerCount": f"{(h_ints[11] % 900) + 100}K" if h_ints[11] % 2 == 0 else f"{(h_ints[11] % 10) + 1}M",
            "recentPosts": [
                "Just checking out my new satirical passport!",
                "Honestly, the local environment is so fast.",
                "Let's spin some threads!"
            ],
            "isManualMode": bool(manual_bio)
        },
        "passport": {
            "title": title,
            "nation": nation,
            "tagline": tagline,
            "passportNumber": passport_num,
            "country": detected_country,
            "scores": scores,
            "stamps": selected_stamps,
            "bio_summary": bio_summary
        },
        "country": detected_country
    }

class MockHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/stats':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = {
                "total_passports": 1284
            }
            self.wfile.write(json.dumps(response).encode('utf-8'))
        elif self.path == '/api/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = {
                "status": "ok",
                "version": "2.0-mock"
            }
            self.wfile.write(json.dumps(response).encode('utf-8'))
        elif self.path.startswith('/api/image-proxy'):
            parsed_path = urlparse(self.path)
            params = parse_qs(parsed_path.query)
            target_url = params.get('url', [None])[0]
            
            if not target_url:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": "URL parameter required"}).encode('utf-8'))
                return
                
            try:
                import urllib.request
                req = urllib.request.Request(target_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req, timeout=5) as response:
                    img_data = response.read()
                    content_type = response.info().get_content_type()
                    
                self.send_response(200)
                self.send_header('Content-Type', content_type)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Cache-Control', 'public, max-age=86400')
                self.end_headers()
                self.wfile.write(img_data)
            except Exception as e:
                # Mock SVG avatar representation if offline/failed to fetch
                self.send_response(200)
                self.send_header('Content-Type', 'image/svg+xml')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                fallback_svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#7c3aed"/><text x="50" y="55" font-size="30" font-family="sans-serif" text-anchor="middle" fill="#ffffff">👤</text></svg>'
                self.wfile.write(fallback_svg.encode('utf-8'))
        else:
            super().do_GET()

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body_data = {}
        if content_length > 0:
            try:
                body_data = json.loads(self.rfile.read(content_length).decode('utf-8'))
            except Exception as e:
                print("Error parsing POST body:", e)

        username = body_data.get("username", "wanderer")
        manual_bio = body_data.get("manualBio", None)
        lang = body_data.get("lang", "en")

        if self.path == '/api/fetch-profile':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            username_clean = username.replace('@', '').strip().lower()
            display_name = username.replace('_', ' ').replace('.', ' ').title()
            avatar = f"https://api.dicebear.com/7.x/bottts/svg?seed={username_clean}"
            
            response = {
                "status": "success",
                "username": username_clean,
                "displayName": display_name,
                "profilePicUrl": avatar,
                "bio": f"A distinguished citizen of the Threads universe. Profile created under seed {username_clean}.",
                "recentPostsText": [
                    "Just checking out my new satirical passport!",
                    "Honestly, the local environment is so fast.",
                    "Let's spin some threads!"
                ],
                "source": "og_tags"
            }
            self.wfile.write(json.dumps(response).encode('utf-8'))
            
        elif self.path == '/api/analyze-profile':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            displayName = body_data.get("displayName", username)
            profilePicUrl = body_data.get("profilePicUrl", None)
            bio = body_data.get("bio", None)
            recentPostsText = body_data.get("recentPostsText", [])
            
            response = generate_mock_passport(username, lang, manual_bio)
            self.wfile.write(json.dumps(response).encode('utf-8'))
            
        elif self.path == '/api/preview' or self.path == '/api/generate':
            # Deprecated endpoints mapped for robustness/legacy fallback
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = generate_mock_passport(username, lang, manual_bio)
            self.wfile.write(json.dumps(response).encode('utf-8'))
            
        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

if __name__ == '__main__':
    server = http.server.HTTPServer(('0.0.0.0', 8001), MockHandler)
    print("Serving Mock Server on http://localhost:8001 ...")
    server.serve_forever()
