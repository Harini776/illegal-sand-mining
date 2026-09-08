from PIL import Image
import os

# Original satellite image
input_image = "narmada_original.jpg"

# Folder where crops will be saved
output_folder = "dataset/normal"

# Create folder if it doesn't exist
os.makedirs(output_folder, exist_ok=True)

# Open image
image = Image.open(input_image)

width, height = image.size

print("Original image size:", width, "x", height)

# Remove small text areas at top and bottom
clean_image = image.crop((
    0,
    30,
    width,
    height - 30
))

clean_width, clean_height = clean_image.size

# Size of each crop
crop_size = 300

# Different positions around the Narmada river
positions = [
    (350, 20),
    (430, 20),
    (300, 150),
    (420, 150),
    (300, 280),
    (420, 280),
    (250, 410),
    (370, 410),
    (150, 500),
    (300, 500)
]

count = 1

for left, upper in positions:

    # Make sure crop stays inside image
    right = min(left + crop_size, clean_width)
    lower = min(upper + crop_size, clean_height)

    crop = clean_image.crop((left, upper, right, lower))

    filename = f"narmada_normal{count}.jpg"

    crop.save(
        os.path.join(output_folder, filename),
        quality=95
    )

    print("Created:", filename)

    count += 1

print("Done! 10 normal images created.")