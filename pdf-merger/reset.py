import os
import shutil

def remove_subfolders_and_pdfs(folder):
    # Remove subfolders
    for root, dirs, files in os.walk(folder, topdown=False):
        for name in dirs:
            folder_path = os.path.join(root, name)
            shutil.rmtree(folder_path)
            print(f"Removed subfolder: {folder_path}")

    # Remove PDFs
    for root, dirs, files in os.walk(folder):
        for file in files:
            if file.lower().endswith('.pdf'):
                file_path = os.path.join(root, file)
                os.remove(file_path)
                print(f"Removed PDF: {file_path}")

if __name__ == "__main__":
    folder = input("Enter the folder path to remove subfolders and PDFs: ")
    remove_subfolders_and_pdfs(folder)
