import os
import tensorflow as tf
from tensorflow.keras import layers, models

# Configuration
IMG_SIZE = 128
BATCH_SIZE = 32
EPOCHS = 10

# Dataset path
DATASET_PATH = "dataset"

# Create models folder if it doesn't exist
os.makedirs("models", exist_ok=True)


# Load training dataset
train_data = tf.keras.utils.image_dataset_from_directory(
    DATASET_PATH,
    image_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    validation_split=0.2,
    subset="training",
    seed=123
)


# Load validation dataset
validation_data = tf.keras.utils.image_dataset_from_directory(
    DATASET_PATH,
    image_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    validation_split=0.2,
    subset="validation",
    seed=123
)


# Print class names
print("Class names:", train_data.class_names)

# Expected:
# ['mining', 'normal']
#
# mining = 0
# normal = 1


# Improve performance
AUTOTUNE = tf.data.AUTOTUNE

train_data = train_data.prefetch(
    buffer_size=AUTOTUNE
)

validation_data = validation_data.prefetch(
    buffer_size=AUTOTUNE
)


# Create CNN model
model = models.Sequential([

    # Input layer
    layers.Input(
        shape=(IMG_SIZE, IMG_SIZE, 3)
    ),

    # Normalize image pixels
    layers.Rescaling(1.0 / 255),

    # CNN Layer 1
    layers.Conv2D(
        32,
        (3, 3),
        activation="relu"
    ),
    layers.MaxPooling2D(),


    # CNN Layer 2
    layers.Conv2D(
        64,
        (3, 3),
        activation="relu"
    ),
    layers.MaxPooling2D(),


    # CNN Layer 3
    layers.Conv2D(
        128,
        (3, 3),
        activation="relu"
    ),
    layers.MaxPooling2D(),


    # Flatten features
    layers.Flatten(),


    # Dense layer
    layers.Dense(
        128,
        activation="relu"
    ),


    # Prevent overfitting
    layers.Dropout(0.5),


    # Output layer
    # 0 = mining
    # 1 = normal
    layers.Dense(
        1,
        activation="sigmoid"
    )
])


# Compile model
model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"]
)


# Display model structure
model.summary()


# Train model
history = model.fit(
    train_data,
    validation_data=validation_data,
    epochs=EPOCHS
)


# Save trained model
MODEL_PATH = "models/sand_mining_model.keras"

model.save(MODEL_PATH)

print("\nModel training completed successfully!")
print("Model saved at:", MODEL_PATH)