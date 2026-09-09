import librosa
import numpy as np


def extract_features(file_path):

    y, sr = librosa.load(file_path, sr=22050, mono=True)

    mfcc = librosa.feature.mfcc(
        y=y,
        sr=sr,
        n_mfcc=13
    )

    mfcc_mean = np.mean(mfcc, axis=1)
    mfcc_std = np.std(mfcc, axis=1)

    mfcc_delta = librosa.feature.delta(mfcc)
    mfcc_delta_mean = np.mean(mfcc_delta, axis=1)

    features = np.hstack([
        mfcc_mean,
        mfcc_std,
        mfcc_delta_mean
    ])

    return features
