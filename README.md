# SandWatch AI

**Illegal Sand Mining Detection using Satellite Imagery, Acoustic Sensing & a Weighted Risk Engine**

SandWatch AI is an AI-powered monitoring system designed to help identify **potential illegal sand mining activity** in riverbed and coastal zones. It combines satellite imagery, acoustic signals, and historical activity data to generate a **per-zone risk score**, helping authorities prioritize areas for investigation.

## Problem

Illegal sand mining can happen in short and unpredictable time windows, making manual inspection difficult. Satellite images can reveal terrain changes, while audio recordings can indicate vehicles and heavy machinery. Historical activity also provides useful context, but these signals are often considered separately.

## Our Solution

SandWatch AI combines three signals:

* **Satellite ML** – Predicts whether a monitoring zone appears **Mining** or **Normal**.
* **Acoustic ML** – Classifies recorded audio as **NORMAL, VEHICLE, or HEAVY_MACHINERY**.
* **Historical Data** – Provides information about previous activity in the zone.
* **Risk Engine** – Fuses these inputs into one final risk score.
* **Dashboard** – Displays the risk status and monitoring information for each zone.

## System Architecture

The system follows this workflow:

```text
React + Vite Frontend
        ↓
FastAPI Backend
        ↓
 ┌───────────────┐
 │               │
Satellite ML   Acoustic ML
 │               │
 └───────┬───────┘
         ↓
    Risk Engine
         ↓
   Weighted Fusion
         ↓
   Final Risk Score
         ↓
     Dashboard
```

The React/Vite frontend sends zone requests to the FastAPI backend. The backend runs the Satellite ML and Acoustic ML components, passes their outputs to the Risk Engine, and returns the final risk score to the dashboard.

## Machine Learning Models

### 1. Satellite ML

* **Input:** Satellite image of a monitoring zone
* **Model:** TensorFlow
* **Output:** Mining / Normal classification
* **Satellite Score:** 0–100, representing mining likelihood

### 2. Acoustic ML

* **Input:** Audio recorded from a monitoring zone
* **Feature Extraction:** MFCC (Mel-Frequency Cepstral Coefficients)
* **Classifier:** Random Forest
* **Output Classes:**

  * NORMAL
  * VEHICLE
  * HEAVY_MACHINERY

## Risk Engine

The Risk Engine uses weighted fusion so that **no single signal determines the risk independently**.

```text
Final Risk =
0.45 × Satellite Score
+ 0.40 × Acoustic Score
+ 0.15 × Historical Score
```

Risk levels:

| Score  | Risk Level |
| ------ | ---------- |
| 0–30   | LOW        |
| 31–65  | MEDIUM     |
| 66–100 | HIGH       |

Satellite and acoustic evidence receive higher weights than historical trends.

## Example

For a sample monitoring zone:

```text
Satellite Score  = 72
Acoustic Score   = 58
Historical Score = 40

Final Risk =
0.45 × 72 + 0.40 × 58 + 0.15 × 40
= 61.6

Risk Level = MEDIUM
```

This demonstrates the complete working pipeline from individual model outputs to the final zone risk level.

## Frontend

The dashboard is built using **React + Vite** and is connected to the FastAPI backend.

It includes:

* Dashboard
* Live Map
* Alerts
* Monitoring Zones
* Satellite Analysis
* Acoustic Monitoring
* Reports
* Historical Data
* Settings

## Technology Stack

* **Frontend:** React, Vite
* **Backend:** FastAPI
* **Programming:** Python
* **Satellite ML:** TensorFlow
* **Acoustic ML:** MFCC + Random Forest
* **Risk Calculation:** Weighted Risk Engine

## Current Status

### Completed

* Satellite ML model built and tested
* Acoustic ML model with MFCC feature extraction and Random Forest
* Risk Engine with Satellite + Acoustic + Historical fusion
* Complete React/Vite dashboard with 9 modules
* FastAPI backend integrating the components end-to-end

### Future Scope

* Deploy real field sensors and cameras
* Integrate live satellite feeds
* Automated alert escalation to authorities
* Mobile application for field officers

## Important Note

SandWatch AI is intended to **identify and prioritize potentially suspicious zones for investigation** using multiple signals. The risk score is a monitoring and decision-support indicator, not a declaration that illegal mining has legally occurred.
