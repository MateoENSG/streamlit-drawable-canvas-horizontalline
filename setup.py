from setuptools import setup, find_packages

setup(
    name="streamlit-drawable-canvas-horizontalline",
    version="0.1.0",  
    author="Votre Nom",
    author_email="votre.email@example.com",
    description="Streamlit component for drawable canvas with horizontal line",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/MateoENSG/streamlit-drawable-canvas-horizontalline",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "streamlit>=0.63",
        "Pillow",
        "numpy",
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.7',
)
