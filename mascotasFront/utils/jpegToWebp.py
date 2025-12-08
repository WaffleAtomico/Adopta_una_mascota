import os
import pathlib
from PIL import Image


def getAllPaths(folderPath: [str]) -> list:
    print(folderPath)
    allFiles:[list] = list()
    for root, _, files in os.walk(folderPath):
        
        for file in files:
            if file.lower().endswith(".jpg"):
                allFiles.append(os.path.join(root, file))
    return allFiles

def jpegToWebp(path: [str]):
    try:
        img = Image.open(path)
        img = img.convert('RGB')
        img.save(f"{path.replace("jpg", "webp")}",'webp')
        os.remove(path)
    except:
        print(f"Error guardando imagen\n {path}")

if __name__ == "__main__":
    actualPath = pathlib.Path().resolve().parent / 'imgs'
    images = getAllPaths(actualPath)
    for img in images:
        jpegToWebp(img)
    

    


