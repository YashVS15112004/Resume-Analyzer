import fitz  # PyMuPDF
import io

def extract_text_from_pdf(pdf_content: bytes) -> str:
    """
    Extracts text from the content of a PDF file.

    Args:
        pdf_content: The byte content of the PDF file.

    Returns:
        The extracted text as a single string.
    """
    text = ""
    try:
        # Open the PDF from bytes
        pdf_document = fitz.open(stream=io.BytesIO(pdf_content), filetype="pdf")
        
        # Iterate through each page and extract text
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            text += page.get_text()
            
        pdf_document.close()
        return text
    except Exception as e:
        # Handle potential errors with corrupted or unreadable PDFs
        print(f"Error parsing PDF: {e}")
        # Depending on requirements, you might want to raise a specific exception here
        return ""