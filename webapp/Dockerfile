FROM python:3
COPY ./frontend /app/frontend
COPY ./backend /app/backend
WORKDIR /app/backend
RUN pip install -r requirements.txt
EXPOSE 80
ENTRYPOINT ["flask"]
CMD ["run", "--host=0.0.0.0", "--port=80"]