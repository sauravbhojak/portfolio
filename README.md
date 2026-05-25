# Saurav Bhojak Portfolio

Premium SaaS-style portfolio for a Python Backend Engineer. Includes a clean responsive UI, fixed-height role animation, product case-study project cards, AJAX contact form and SQLite message storage.

## Structure

```text
portfolio/
  app/
    main.py
    database.py
    models.py
    schemas.py
    routes/
      api.py
      pages.py
    static/
      css/style.css
      js/main.js
      images/favicon.svg
  templates/
    index.html
    components/
      nav.html
      footer.html
  requirements.txt
  Dockerfile
  .env.example
```

## Run

```powershell
cd d:\My_work\ss_portfolio\portfolio
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8001
```

Open `http://127.0.0.1:8001`.

## Docker

```powershell
docker build -t saurav-portfolio .
docker run -p 8000:8000 saurav-portfolio
```

## API

- `GET /` portfolio
- `POST /api/contact` save contact message
