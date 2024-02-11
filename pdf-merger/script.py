import os
from PIL import Image
from PyPDF2 import PdfMerger
import shutil
import io


# Hash function to divide images into subfolders
def hash_function(filename):

    # Extract the first two characters 
    hash_string = filename[:2]

    # Convert the hash string into a number
    try:
        hash_number = int(hash_string)
    except ValueError:
        hash_number = ord(hash_string[0])

    # Divide the number into one of three folders
    subfolder = str(hash_number % 3).zfill(2)

    # Create a hash string using the remaining characters of the filename
    remaining_hash_string = filename[2:]
    
    # Combine the subfolder and remaining hash string to form the final hash
    final_hash_string = subfolder + remaining_hash_string

    # Take the first 8 alphanumeric characters as the subfolder name
    alphanumeric_chars = ''.join(char for char in final_hash_string if char.isalnum())
    return alphanumeric_chars[:8]  # Use the first 8 alphanumeric characters as the subfolder name

def divide_files_into_subfolders(input_folder):
    # Get a list of files in the input folder
    files = [f for f in os.listdir(input_folder) if os.path.isfile(os.path.join(input_folder, f))]

    # Divide the files into 3 subfolders using hashing
    for file in files:
        # Generate a hash based on the filename
        hash_subfolder = hash_function(file)

        # Determine the subfolder based on the first character of the hash
        subfolder = str(int(hash_subfolder[1], 16) % 3).zfill(2)

        destination_folder = os.path.join(input_folder, subfolder)
        os.makedirs(destination_folder, exist_ok=True)

        destination_path = os.path.join(destination_folder, file)
        source_path = os.path.join(input_folder, file)

        # Copy the file and move it on its folder
        shutil.copy(source_path, destination_path)
        print(f"Moved {file} to {destination_folder}")

def merge_images_to_pdf(input_folder, output_folder, subfolder):
    try:

        
        # Paths for subfolder and the output PDF file will be generated
        subfolder_path = os.path.join(input_folder, subfolder)
        output_pdf_path = os.path.join(output_folder, f"{subfolder}.pdf")

        # Get a sorted list of image files in the subfolder
        image_files = sorted([f for f in os.listdir(subfolder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))])

        # Create a PDF merger object
        pdf_merger = PdfMerger()

        # Append each image as a page to the PDF
        for image_file in image_files:
            image_path = os.path.join(subfolder_path, image_file)
            print(image_path)
            image = Image.open(image_path)


            if image.mode == 'RGBA':

                image = image.convert('RGB')

            # Convert the PIL Image to bytes
            image_bytes = io.BytesIO()

            image.save(image_bytes, format='PDF')
            
            # Beginning of the bytes
            image_bytes.seek(0)
            # Append the bytes to the PDF merger
            pdf_merger.append(image_bytes)



        # Write the merged PDF to the output file
        with open(output_pdf_path, 'wb') as output_pdf:
            pdf_merger.write(output_pdf)
        
        print(f"Merged images from {subfolder} into {output_pdf_path}")

    except Exception as e:
        print(f"Error for images to PDF processing {subfolder}: {e}")


def main():

    # Specified input and output folders
    input_folder = './images'  
    output_folder = './output/'  


    try:

        parent_output_folder = os.path.dirname(output_folder)
        os.makedirs(parent_output_folder, exist_ok=True)
    
        # Perform file organization tasks into subfolders
        divide_files_into_subfolders(input_folder)

        # Perform PDF merging tasks for each subfolder
        for subfolder in ['00', '01', '02']:
            merge_images_to_pdf(input_folder, output_folder, subfolder)

    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main()

if __name__ == "__main__":
    main()