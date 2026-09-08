from PIL import Image
import os

# Original Copernicus image
input_image = "mining_original.jpg"

# Output folder
output_folder = "dataset/mining"

os.makedirs(output_folder, exist_ok=True)

# Open image
image = Image.open(input_image)

print("Original image size:", image.size)

# Remove Copernicus UI
# Keep only the satellite map
map_image = image.crop((520, 20, 1570, 790))

print("Map image size:", map_image.size)

# Size of each crop
crop_size = 250

# 10 crop positions
positions = [
    (20, 430),
    (120, 400),
    (220, 420),
    (320, 390),
    (420, 410),
    (520, 400),
    (620, 430),
    (720, 390),
    (800, 420),
    (650, 500)
]

# Create 10 images
for i, (left, top) in enumerate(positions, start=1):

    right = left + crop_size
    bottom = top + crop_size

    crop = map_image.crop(
        (left, top, right, bottom)
    )

    filename = f"mining{i}.jpg"

    crop.save(
        os.path.join(output_folder, filename),
        quality=95
    )

    print("Created:", filename)

print("Done! 10 mining crops created.")