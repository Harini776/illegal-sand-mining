def calculate_risk(satellite_score, acoustic_score, historical_score=0):
    risk_score = (
        0.45 * satellite_score
        + 0.40 * acoustic_score
        + 0.15 * historical_score
    )

    risk_score = round(risk_score)

    if risk_score <= 30:
        risk_level = "LOW"
    elif risk_score <= 65:
        risk_level = "MEDIUM"
    else:
        risk_level = "HIGH"

    return risk_score, risk_level