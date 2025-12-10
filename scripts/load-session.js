def zap_started(zap, target):
    import json

    with open('/zap/wrk/session.json') as f:
        session = json.load(f)

    for cookie in session["cookies"]:
        zap.cookies.add_cookie(
            cookie["domain"],
            cookie["name"],
            cookie["value"],
            cookie.get("path", "/"),
            cookie.get("secure", False)
        )
